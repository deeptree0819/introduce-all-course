import { AdminModule } from "@admin/admin.module";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { SupabaseModule } from "./common/supabase/supabase.module";

@Module({
  imports: [ConfigModule.forRoot(), SupabaseModule, AdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
