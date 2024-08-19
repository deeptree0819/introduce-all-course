import { RolesGuard } from "@common/guards/roles.guard";
import { ImageUploadModule } from "@common/upload/upload.module";
import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { AdminsModule } from "./admins/admins.module";
import { AuthModule } from "./auth/auth.module";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";
import { EventsModule } from "./events/events.module";
import { MainBannersModule } from "./main-banners/main-banners.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    AdminsModule,
    AuthModule,
    UsersModule,
    MainBannersModule,
    EventsModule,
    ImageUploadModule,
  ],
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
