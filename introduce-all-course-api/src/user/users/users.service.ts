import { Tables } from "@common/database.types";
import { SupabaseService } from "@common/supabase/supabase.service";
import { Injectable } from "@nestjs/common";

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

  async updateUser(userId: number, dto: any): Promise<Tables<"users">> {
    const client = this.supabaseService.getClient();
    const { data, error } = await client
      .from("users")
      .update(dto)
      .eq("users_id", userId)
      .select()
      .maybeSingle();

    if (error || !data) {
      throw new Error(error?.message ?? "사용자 정보를 수정할 수 없습니다.");
    }

    return data;
  }
}
