import { Tables } from "@common/database.types";
import { Paginated } from "@common/pagination";
import { SupabaseService } from "@common/supabase/supabase.service";
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { GetAllUsersWithPaginationDto } from "./dtos/get-all-users.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
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

    query
      .order("updated_at", { ascending: false })
      .range(
        (dto.page - 1) * dto.itemsPerPage,
        dto.page * dto.itemsPerPage - 1,
      );

    const { data, error } = await query;

    if (error) {
      throw new InternalServerErrorException(
        error?.message || "유저 조회에 실패했습니다.",
      );
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
      throw new InternalServerErrorException(
        error?.message || "유저 조회에 실패했습니다.",
      );
    }

    if (!data) {
      throw new NotFoundException("어드민이 존재하지 않습니다.");
    }

    return plainToInstance(UserDto, data);
  }

  async updateUser(
    userId: number,
    dto: UpdateUserDto,
  ): Promise<Tables<"users">> {
    const client = this.supabaseService.getClient();
    const { data: user, error: selectError } = await client
      .from("users")
      .select()
      .eq("users_id", userId)
      .maybeSingle();

    if (selectError) {
      throw new NotFoundException(
        selectError?.message || "유저 수정에 실패했습니다.",
      );
    }

    if (dto.nickname) {
      if (await this.checkDuplicateNickname(dto.nickname, user.users_id)) {
        throw new ConflictException("다른 유저가 사용중인 닉네임입니다.");
      }
    }

    if (dto.email) {
      if (await this.checkDuplicateEmail(dto.email, user.users_id)) {
        throw new ConflictException("다른 유저가 사용중인 이메일입니다.");
      }
    }

    if (dto.phone_number) {
      if (
        await this.checkDuplicatePhoneNumber(dto.phone_number, user.users_id)
      ) {
        throw new ConflictException("다른 유저가 사용중인 전화번호입니다.");
      }
    }

    user.nickname = dto.nickname ?? user.nickname;
    user.role = dto.role ?? user.role;
    user.profile_url = dto.profile_url ?? null;
    user.profile_thumbnail_url = dto.profile_thumbnail_url ?? null;
    user.gender = dto.gender ?? user.gender;
    user.user_name = dto.user_name ?? user.user_name;
    user.email = dto.email ?? user.email;
    user.birthyear = dto.birthyear ?? user.birthyear;
    user.phone_number = dto.phone_number ?? user.phone_number;
    user.updated_at = new Date().toISOString();

    const { data, error: updateError } = await client
      .from("users")
      .update(user)
      .eq("users_id", userId)
      .select()
      .maybeSingle();

    if (updateError) {
      throw new InternalServerErrorException(
        updateError?.message || "수정에 실패했습니다.",
      );
    }

    return data;
  }

  private async checkDuplicateNickname(
    nickname: string,
    exceptUserId?: number,
  ): Promise<boolean> {
    const client = this.supabaseService.getClient();
    const { data: user } = await client
      .from("users")
      .select()
      .eq("nickname", nickname)
      .neq("users_id", exceptUserId)
      .maybeSingle();

    return !!user;
  }

  private async checkDuplicateEmail(
    email: string,
    exceptUserId?: number,
  ): Promise<boolean> {
    const client = this.supabaseService.getClient();
    const { data: user } = await client
      .from("users")
      .select()
      .eq("email", email)
      .neq("users_id", exceptUserId)
      .maybeSingle();

    return !!user;
  }

  private async checkDuplicatePhoneNumber(
    phoneNumber: string,
    exceptUserId?: number,
  ): Promise<boolean> {
    const client = this.supabaseService.getClient();
    const { data: user } = await client
      .from("users")
      .select()
      .eq("phone_number", phoneNumber)
      .neq("users_id", exceptUserId)
      .maybeSingle();

    return !!user;
  }

  async deleteUser(userId: number): Promise<void> {
    const client = this.supabaseService.getClient();
    const { error } = await client
      .from("users")
      .delete()
      .eq("users_id", userId);

    if (error) {
      throw new InternalServerErrorException(
        error?.message || "삭제를 실패했습니다.",
      );
    }
  }
}
