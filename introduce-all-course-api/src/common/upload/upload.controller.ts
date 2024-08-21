import { CustomApiOperation } from "@common/decorators/api-operation.decorator";
import { Controller, Get, Query } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { UploadService } from "./upload.service";

@ApiBearerAuth()
@Controller("/upload")
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @CustomApiOperation({})
  @Get()
  async getUploadURL(
    @Query("tag") tag: string,
    @Query("contentType") contentType: string,
    @Query("fileName") fileName: string,
  ): Promise<string> {
    return this.uploadService.generateUploadURL(tag, contentType, fileName);
  }
}
