import { RolesGuard } from "@common/guards/roles.guard";
import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { AdminsModule } from "./admins/admins.module";
import { AuthModule } from "./auth/auth.module";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";
import { MainBannersModule } from "./main-banners/main-banners.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [AdminsModule, AuthModule, UsersModule, MainBannersModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AdminModule {}
