import { JwtAuthGuard } from "@admin/auth/jwt-auth.guard";
import { Tables } from "@common/database.types";
import { CustomApiOperation } from "@common/decorators/api-operation.decorator";
import { RolesGuard } from "@common/guards/roles.guard";
import { BasePaginatedDto, IPaginated } from "@common/pagination";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse } from "@nestjs/swagger";
import { AdminCreateMainBannerDto } from "./dtos/admin-create-main-banner.dto";
import { AdminGetAllMainBannesWithPaginationDto } from "./dtos/admin-get-all-main-banners.dto";
import { AdminMainBannerSummaryDto } from "./dtos/admin-main-banner-summary.dto";
import { AdminMainBannerDto } from "./dtos/admin-main-banner.dto";
import { AdminUpdateMainBannerDto } from "./dtos/admin-update-main-banner.dto";
import { MainBannersService } from "./main-banners.service";

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@Controller()
export class MainBannersController {
  constructor(private readonly mainBannersService: MainBannersService) {}

  @CustomApiOperation({
    summary: "메인페이지 배너 목록 조회",
    tags: ["admin-main-banners"],
  })
  @ApiOkResponse({
    type: BasePaginatedDto(AdminMainBannerSummaryDto, "AdminMainBannerSummary"),
  })
  @Get("/admin/main/banners")
  async getAllMainBannersWithPagination(
    @Query() dto: AdminGetAllMainBannesWithPaginationDto,
  ): Promise<IPaginated<AdminMainBannerSummaryDto>> {
    return this.mainBannersService.getAllMainBannersWithPagination(dto);
  }

  @CustomApiOperation({
    summary: "메인페이지 배너 상세 조회",
    tags: ["admin-main-banners"],
  })
  @Get("/admin/main/banners/:mainBannerId")
  async getMainBannerById(
    @Param("mainBannerId", ParseIntPipe) mainBannerId: number,
  ): Promise<AdminMainBannerDto> {
    return this.mainBannersService.getMainBannerById(mainBannerId);
  }

  @CustomApiOperation({
    summary: "메인페이지 배너 수정",
    tags: ["admin-main-banners"],
  })
  @Patch("/admin/main/banners/:mainBannerId")
  async updateMainBanner(
    @Param("mainBannerId", ParseIntPipe) mainBannerId: number,
    @Body() dto: AdminUpdateMainBannerDto,
  ): Promise<Tables<"main_banners">> {
    return this.mainBannersService.updateMainBanner(mainBannerId, dto);
  }

  @CustomApiOperation({
    summary: "메인페이지 배너 추가",
    tags: ["admin-main-banners"],
  })
  @Post("/admin/main/banners")
  async createMainBanner(
    @Body() dto: AdminCreateMainBannerDto,
  ): Promise<Tables<"main_banners">> {
    return this.mainBannersService.createMainBanner(dto);
  }

  @CustomApiOperation({
    summary: "메인페이지 배너 삭제",
    tags: ["admin-main-banners"],
  })
  @Delete("/admin/main/banners/:mainBannerId")
  async deleteMainBanner(
    @Param("mainBannerId", ParseIntPipe) mainBannerId: number,
  ) {
    this.mainBannersService.deleteMainBanner(mainBannerId);
  }
}
