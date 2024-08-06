import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { AdminsModule } from "./admins/admins.module";
import { AuthModule } from "./auth/auth.module";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";

@Module({
  imports: [AdminsModule, AuthModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AdminModule {}
