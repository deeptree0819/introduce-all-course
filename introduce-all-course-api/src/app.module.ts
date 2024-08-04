import { AdminModule } from "@admin/admin.module";
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { SupabaseModule } from "./common/supabase/supabase.module";

@Module({
  imports: [SupabaseModule, AdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
