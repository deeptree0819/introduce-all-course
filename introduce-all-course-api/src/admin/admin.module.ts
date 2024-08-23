import { UploadModule } from "@common/upload/upload.module";
import { Module } from "@nestjs/common";
import { AdminsModule } from "./admins/admins.module";
import { AuthModule } from "./auth/auth.module";
import { EventsModule } from "./events/events.module";
import { FreeLecturesModule } from "./free-lectures/free-lectures.module";
import { InquiryModule } from "./inquiry/inquiry.module";
import { MainBannersModule } from "./main-banners/main-banners.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    AdminsModule,
    AuthModule,
    UsersModule,
    MainBannersModule,
    EventsModule,
    UploadModule,
    InquiryModule,
    FreeLecturesModule,
  ],
})
export class AdminModule {}
