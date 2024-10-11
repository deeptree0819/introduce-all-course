import { Tables } from "@common/database.types";
import { SupabaseService } from "@common/supabase/supabase.service";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { UpdateUserDto } from "./dtos/update-user.dto";

@Injectable()
export class UsersService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async getUserById(userId: number): Promise<Tables<"users">> {
    const client = this.supabaseService.getClient();
    const { data, error } = await client
      .from("users")
      .select()
      .eq("users_id", userId)
      .maybeSingle();

    if (error || !data) {
      throw new Error("사용자 정보를 찾을 수 없습니다.");
    }

    return data;
  }

  async updateUser(
    userId: number,
    dto: UpdateUserDto,
  ): Promise<Tables<"users">> {
    const client = this.supabaseService.getClient();
    const { data: selectedUser, error: selectError } = await client
      .from("users")
      .select()
      .eq("users_id", userId)
      .maybeSingle();

    if (selectError || !selectedUser) {
      throw new Error(
        selectError?.message ?? "사용자 정보를 찾을 수 없습니다.",
      );
    }

    const updatedDto = {
      ...selectedUser,
      ...dto,
      profile_thumbnail_url: dto.profile_url
        ? dto.profile_url
        : selectedUser.profile_thumbnail_url,
    };

    const { data: updatedUser, error: updateError } = await client
      .from("users")
      .update(updatedDto)
      .eq("users_id", userId)
      .select()
      .maybeSingle();

    if (updateError || !updatedUser) {
      throw new Error(
        updateError?.message ?? "사용자 정보를 수정할 수 없습니다.",
      );
    }

    return updatedUser;
  }

  async deleteUser(userId: number): Promise<void> {
    const client = this.supabaseService.getClient();
    const { error } = await client
      .from("users")
      .update({ deleted: true })
      .eq("users_id", userId);

    if (error) {
      throw new InternalServerErrorException(
        error?.message || "삭제를 실패했습니다.",
      );
    }
  }
}
