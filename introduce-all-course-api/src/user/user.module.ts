import { UploadModule } from "@common/upload/upload.module";
import { Module } from "@nestjs/common";
import { EventsModule } from "./events/events.module";

@Module({
  imports: [UploadModule, EventsModule],
})
export class UserModule {}
