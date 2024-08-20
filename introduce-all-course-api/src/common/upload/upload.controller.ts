import { CustomApiOperation } from "@common/decorators/api-operation.decorator";
import { Controller, Get, Query } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { ImageUploadService } from "./upload.service";

@ApiBearerAuth()
@Controller("/upload")
export class UploadController {
  constructor(private readonly imageUploadService: ImageUploadService) {}

  @CustomApiOperation({})
  @Get()
  async getUploadURL(
    @Query("tag") tag: string,
    @Query("contentType") contentType: string,
  ): Promise<string> {
    return this.imageUploadService.generateUploadURL(tag, contentType);
  }
}
