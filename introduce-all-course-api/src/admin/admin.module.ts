import { SupabaseModule } from "@common/supabase/supabase.module";
import { Module } from "@nestjs/common";
import { AdminsController } from "./controllers/admins.controller";
import { AdminsService } from "./services/admins.service";

@Module({
  imports: [SupabaseModule],
  controllers: [AdminsController],
  providers: [AdminsService],
})
export class AdminModule {}
