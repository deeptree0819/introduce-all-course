import { SALT_ROUNDS } from "@common/constant";
import { Tables } from "@common/database.types";
import { Paginated } from "@common/pagination";
import { SupabaseService } from "@common/supabase/supabase.service";
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { hashSync } from "bcrypt";
import { plainToInstance } from "class-transformer";
import { AdminSummaryDto } from "./dtos/admin-summary.dto";
import { AdminDto } from "./dtos/admin.dto";
import { CreateAdminDto } from "./dtos/create-admin.dto";
import { GetAllAdminsWithPaginationDto } from "./dtos/get-all-admins.dto";
import { UpdateAdminDto } from "./dtos/update-admin.dto";

@Injectable()
export class AdminsService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async getAllAdminsWithPagination(
    dto: GetAllAdminsWithPaginationDto,
  ): Promise<Paginated<AdminSummaryDto>> {
    const client = this.supabaseService.getClient();
    const query = client
      .from("admins")
      .select("admin_id, admin_name, admin_role, admin_email, created_at");

    if (dto.role) query.eq("admin_role", dto.role);

    if (dto.queryText)
      query.or(
        dto.queryText
          ? `admin_name.ilike.%${dto.queryText}%,admin_email.ilike.%${dto.queryText}%`
          : undefined,
      );

    query
      .order("admin_id", { ascending: true })
      .range(
        (dto.page - 1) * dto.itemsPerPage,
        dto.page * dto.itemsPerPage - 1,
      );

    const { data, error } = await query;

    if (error) {
      throw new InternalServerErrorException(
        error?.message || "어드민 조회에 실패했습니다.",
      );
    }

    const { count, error: countError } = await client
      .from("admins")
      .select("admin_id", { count: "exact", head: true });

    if (countError) {
      throw new InternalServerErrorException(
        countError?.message || "전체 개수 조회에 실패하였습니다.",
      );
    }

    return new Paginated(
      plainToInstance(AdminSummaryDto, data),
      count,
      dto.page,
      dto.itemsPerPage,
    );
  }

  async getAdminById(adminId: number): Promise<AdminDto> {
    const client = this.supabaseService.getClient();
    const { data, error } = await client
      .from("admins")
      .select()
      .eq("admin_id", adminId)
      .maybeSingle();

    if (error) {
      throw new InternalServerErrorException(
        error?.message || "어드민 조회에 실패했습니다.",
      );
    }

    if (!data) {
      throw new NotFoundException("어드민이 존재하지 않습니다.");
    }

    return plainToInstance(AdminDto, data);
  }

  async updateAdmin(
    adminId: number,
    dto: UpdateAdminDto,
  ): Promise<Tables<"admins">> {
    const client = this.supabaseService.getClient();
    const { data: admin, error: selectError } = await client
      .from("admins")
      .select()
      .eq("admin_id", adminId)
      .maybeSingle();

    if (selectError) {
      throw new NotFoundException(
        selectError?.message || "어드민 수정에 실패하였습니다.",
      );
    }

    if (dto.admin_email) {
      if (await this.checkDuplicateEmail(dto.admin_email, admin.admin_id)) {
        throw new ConflictException("다른 어드민이 사용중인 이메일입니다.");
      }
    }

    admin.admin_role = dto.admin_role ?? admin.admin_role;
    admin.admin_name = dto.admin_name ?? admin.admin_name;
    admin.admin_email = dto.admin_email ?? admin.admin_email;
    admin.admin_password = !!dto.admin_password
      ? hashSync(dto.admin_password, SALT_ROUNDS)
      : admin.admin_password;
    admin.updated_at = new Date().toISOString();

    const { data, error: updateError } = await client
      .from("admins")
      .update(admin)
      .eq("admin_id", adminId)
      .select()
      .maybeSingle();

    if (updateError) {
      throw new InternalServerErrorException(
        updateError?.message || "수정을 실패하였습니다.",
      );
    }

    return data;
  }

  async createAdmin(dto: CreateAdminDto): Promise<Tables<"admins">> {
    if (await this.checkDuplicateEmail(dto.admin_email)) {
      throw new ConflictException("다른 어드민이 사용중인 이메일입니다.");
    }

    const client = this.supabaseService.getClient();
    const { data, error } = await client
      .from("admins")
      .insert([
        {
          admin_name: dto.admin_name,
          admin_email: dto.admin_email,
          admin_role: dto.admin_role,
          admin_password: hashSync(dto.admin_password, SALT_ROUNDS),
        },
      ])
      .select()
      .maybeSingle();

    if (error || !data) {
      throw new InternalServerErrorException(
        error?.message || "생성을 실패하였습니다.",
      );
    }

    return data;
  }

  private async checkDuplicateEmail(
    email: string,
    exceptAdminId?: number,
  ): Promise<boolean> {
    const client = this.supabaseService.getClient();
    const { data: admin } = await client
      .from("admins")
      .select()
      .eq("email", email)
      .neq("admin_id", exceptAdminId)
      .maybeSingle();

    return !!admin;
  }

  async deleteAdmin(adminId: number): Promise<void> {
    const client = this.supabaseService.getClient();
    const { error } = await client
      .from("admins")
      .delete()
      .eq("admin_id", adminId);

    if (error) {
      throw new InternalServerErrorException(
        error?.message || "삭제를 실패하였습니다.",
      );
    }
  }
}
