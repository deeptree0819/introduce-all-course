import { SupabaseService } from "@common/supabase/supabase.service";
import { Injectable, InternalServerErrorException } from "@nestjs/common";

@Injectable()
export class AdminsService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async getAllAdmins() {
    const client = this.supabaseService.getClient();
    const { data, error } = await client
      .from("admins")
      .select("admin_id, admin_name, admin_role, admin_email, created_at")
      .order("admin_id", { ascending: true });

    if (error) {
      throw new InternalServerErrorException(error.message);
    }
    return data;
  }
}
