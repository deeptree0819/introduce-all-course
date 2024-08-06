import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Database } from "database.types";

@Injectable()
export class SupabaseService {
  private supabaseClient: SupabaseClient<Database>;

  constructor(private configService: ConfigService) {
    this.supabaseClient = createClient<Database>(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_KEY!,
    );
  }

  getClient(): SupabaseClient<Database> {
    return this.supabaseClient;
  }
}
