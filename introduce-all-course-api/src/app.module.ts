import { AdminModule } from "@admin/admin.module";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { UserModule } from "@user/user.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { SupabaseModule } from "./common/supabase/supabase.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SupabaseModule,
    AdminModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
