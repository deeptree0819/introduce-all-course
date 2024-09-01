import { UploadModule } from "@common/upload/upload.module";
import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { EventsModule } from "./events/events.module";
import { FreeLecturesModule } from "./free-lectures/free-lectures.module";
import { InquiryModule } from "./inquiry/inquiry.module";
import { MainBannersModule } from "./main-banners/main-banners.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    UploadModule,
    EventsModule,
    FreeLecturesModule,
    MainBannersModule,
    InquiryModule,
    AuthModule,
    UsersModule,
  ],
})
export class UserModule {}
