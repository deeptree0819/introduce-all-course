import { Paginated } from "@common/pagination";
import { SupabaseService } from "@common/supabase/supabase.service";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { AdminSummaryDto } from "./dtos/admin-summary.dto";
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
}
