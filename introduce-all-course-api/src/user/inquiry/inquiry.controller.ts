import { CustomApiOperation } from "@common/decorators/api-operation.decorator";
import { Controller, Get } from "@nestjs/common";
import { InquiryService } from "./inquiry.service";

@Controller()
export class InquiryController {
  constructor(private readonly inquiryService: InquiryService) {}

  @CustomApiOperation({
    summary: "상담신청 링크 조회",
    tags: ["inquiry-form-link"],
  })
  @Get("/inquiry/form-links/latest")
  async getLatestInquiryFormLink(): Promise<string> {
    return this.inquiryService.getLatestInquiryFormLink();
  }
}
