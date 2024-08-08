import { Paginated } from "@common/pagination";
import { SupabaseService } from "@common/supabase/supabase.service";
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { AdminSummaryDto } from "./dtos/admin-summary.dto";
import { AdminDto } from "./dtos/admin.dto";
import { GetAllAdminsWithPaginationDto } from "./dtos/get-all-admins.dto";

@Injectable()
export class AdminsService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async getAllAdmins(
    dto: GetAllAdminsWithPaginationDto,
  ): Promise<Paginated<AdminSummaryDto>> {
    const client = this.supabaseService.getClient();
    const query = client
      .from("admins")
      .select("admin_id, admin_name, admin_role, admin_email, created_at");

    if (dto.queryText)
      query.or(
        dto.queryText
          ? `admin_name.ilike.%${dto.queryText}%,admin_email.ilike.%${dto.queryText}%`
          : undefined,
      );

    if (dto.order) query.order("admin_id", { ascending: dto.order === "ASC" });

    const { data, count, error } = await query;

    if (error) {
      throw new InternalServerErrorException(error.message);
    }

    return new Paginated(
      plainToInstance(AdminSummaryDto, data),
      count,
      dto.page,
      dto.itemsPerPage,
    );
  }

  async getAdminById(adminId: string): Promise<AdminDto> {
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
}
