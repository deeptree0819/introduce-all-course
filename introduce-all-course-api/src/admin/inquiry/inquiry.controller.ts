import { Tables } from "@common/database.types";
import { CustomApiOperation } from "@common/decorators/api-operation.decorator";
import { CurrentUser } from "@common/decorators/current-user.decorator";
import { BasePaginatedDto, IPaginated, PaginateDto } from "@common/pagination";
import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse } from "@nestjs/swagger";
import { CreateInquiryFormLinkDto } from "./dtos/create-inquiry-form-link.dto";
import { InquiryFormLinkDto } from "./dtos/inquiry-form-link.dto";
import { InquiryService } from "./inquiry.service";

@ApiBearerAuth()
@Controller()
export class InquiryController {
  constructor(private readonly inquiryService: InquiryService) {}

  @CustomApiOperation({
    summary: "상담신청 링크 목록 조회",
    tags: ["admin-inquiry"],
  })
  @ApiOkResponse({
    type: BasePaginatedDto(InquiryFormLinkDto, "InquiryFormLink"),
  })
  @Get("/admin/inquiry/form-links")
  async getAllInquiryFormLinksWithPagination(
    @Query() dto: PaginateDto,
  ): Promise<IPaginated<InquiryFormLinkDto>> {
    return this.inquiryService.getAllInquiryFormLinksWithPagination(dto);
  }

  @CustomApiOperation({
    summary: "상담신청 링크 조회",
    tags: ["admin-inquiry"],
  })
  @Get("/admin/inquiry/form-links/latest")
  async getLatestInquiryFormLink(): Promise<string> {
    return this.inquiryService.getLatestInquiryFormLink();
  }

  @CustomApiOperation({
    summary: "상담신청 링크 추가",
    tags: ["admin-inquiry"],
  })
  @Post("/admin/inquiry/form-links")
  async createInquiryFormLink(
    @CurrentUser() me,
    @Body() dto: CreateInquiryFormLinkDto,
  ): Promise<Tables<"inquiry_form_links">> {
    return this.inquiryService.createInquiryFormLink(me.userId, dto);
  }
}
