import { UploadModule } from "@common/upload/upload.module";
import { Module } from "@nestjs/common";
import { EventsModule } from "./events/events.module";
import { FreeLecturesModule } from "./free-lectures/free-lectures.module";
import { InquiryModule } from "./inquiry/inquiry.module";
import { MainBannersModule } from "./main-banners/main-banners.module";

@Module({
  imports: [
    UploadModule,
    EventsModule,
    FreeLecturesModule,
    MainBannersModule,
    InquiryModule,
  ],
})
export class UserModule {}
