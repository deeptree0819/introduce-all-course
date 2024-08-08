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

    query.range(
      (dto.page - 1) * dto.itemsPerPage,
      dto.page * dto.itemsPerPage - 1,
    );

    const { data, error } = await query;

    if (error) {
      throw new InternalServerErrorException(error.message);
    }

    return new Paginated(
      plainToInstance(AdminSummaryDto, data),
      data.length,
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
      .single();

    if (error) {
      throw new InternalServerErrorException(error.message);
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
      throw new NotFoundException(selectError.message);
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

    const { data, error: updateError } = await client
      .from("admins")
      .update(admin)
      .eq("admin_id", adminId)
      .select()
      .maybeSingle();

    if (updateError) {
      throw new InternalServerErrorException(updateError.message);
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
}
