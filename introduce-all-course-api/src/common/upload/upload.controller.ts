import { Controller, Get, Param } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { ImageUploadService } from "./upload.service";

@ApiBearerAuth()
@Controller("/upload")
export class UploadController {
  constructor(private readonly imageUploadService: ImageUploadService) {}

  @Get("/:tag")
  async getUploadURL(@Param("tag") tag: string) {
    return this.imageUploadService.generateUploadURL(tag);
  }
}
