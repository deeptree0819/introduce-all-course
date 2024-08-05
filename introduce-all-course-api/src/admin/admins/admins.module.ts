import { SupabaseModule } from "@common/supabase/supabase.module";
import { Module } from "@nestjs/common";
import { AdminsController } from "./admins.controller";
import { AdminsService } from "./admins.service";

@Module({
  imports: [SupabaseModule],
  controllers: [AdminsController],
  providers: [AdminsService],
})
export class AdminsModule {}
