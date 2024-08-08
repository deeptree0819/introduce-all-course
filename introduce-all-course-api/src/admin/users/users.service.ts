import { Paginated } from "@common/pagination";
import { SupabaseService } from "@common/supabase/supabase.service";
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { GetAllUsersWithPaginationDto } from "./dtos/get-all-users.dto";
import { UserSummaryDto } from "./dtos/user-summary.dto";
import { UserDto } from "./dtos/user.dto";

@Injectable()
export class UsersService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async getAllUsersWithPagination(
    dto: GetAllUsersWithPaginationDto,
  ): Promise<Paginated<UserSummaryDto>> {
    const client = this.supabaseService.getClient();
    const query = client
      .from("users")
      .select(
        "users_id, role, user_name, nickname, email, phone_number, created_at",
      );

    if (dto.role) query.eq("role", dto.role);

    if (dto.queryText)
      query.or(
        dto.queryText
          ? `user_name.ilike.%${dto.queryText}%,nickname.ilike.%${dto.queryText}%,email.ilike.%${dto.queryText}%,phone_number.ilike.%${dto.queryText}%`
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
      plainToInstance(UserSummaryDto, data),
      data.length,
      dto.page,
      dto.itemsPerPage,
    );
  }

  async getUserById(userId: number): Promise<UserDto> {
    const client = this.supabaseService.getClient();
    const { data, error } = await client
      .from("users")
      .select()
      .eq("users_id", userId)
      .maybeSingle();

    if (error) {
      throw new InternalServerErrorException(error.message);
    }

    if (!data) {
      throw new NotFoundException("어드민이 존재하지 않습니다.");
    }

    return plainToInstance(UserDto, data);
  }
}
