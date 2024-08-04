import { SupabaseService } from "@common/supabase/supabase.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AdminsService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async getAllAdmins() {
    const client = this.supabaseService.getClient();
    const { data, error } = await client
      .from("admins")
      .select("admin_id, admin_name, admin_role, admin_email, created_at")
      .order("admin_id", { ascending: true });

    console.log(data);

    if (error) {
      throw new Error(error.message);
    }
    return data;
  }
}
