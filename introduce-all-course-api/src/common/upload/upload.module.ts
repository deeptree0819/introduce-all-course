import { Module } from "@nestjs/common";
import { UploadController } from "./upload.controller";
import { ImageUploadService } from "./upload.service";

@Module({
  providers: [ImageUploadService],
  controllers: [UploadController],
})
export class ImageUploadModule {}
