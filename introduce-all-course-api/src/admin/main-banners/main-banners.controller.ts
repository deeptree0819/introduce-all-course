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
import { CreateMainBannerDto } from "./dtos/create-main-banner.dto";
import { GetAllMainBannesWithPaginationDto } from "./dtos/get-all-main-banners.dto";
import { MainBannerSummaryDto } from "./dtos/main-banner-summary.dto";
import { MainBannerDto } from "./dtos/main-banner.dto";
import { UpdateMainBannerDto } from "./dtos/update-main-banner.dto";
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
  @ApiOkResponse({ type: BasePaginatedDto(MainBannerSummaryDto, "MainBanner") })
  @Get("/admin/main/banners")
  async getAllMainBannersWithPagination(
    @Query() dto: GetAllMainBannesWithPaginationDto,
  ): Promise<IPaginated<MainBannerSummaryDto>> {
    return this.mainBannersService.getAllMainBannersWithPagination(dto);
  }

  @CustomApiOperation({
    summary: "메인페이지 배너 상세 조회",
    tags: ["admin-main-banners"],
  })
  @Get("/admin/main/banners/:mainBannerId")
  async getMainBannerById(
    @Param("mainBannerId", ParseIntPipe) mainBannerId: number,
  ): Promise<MainBannerDto> {
    return this.mainBannersService.getMainBannerById(mainBannerId);
  }

  @CustomApiOperation({
    summary: "메인페이지 배너 수정",
    tags: ["admin-main-banners"],
  })
  @Patch("/admin/main/banners/:mainBannerId")
  async updateMainBanner(
    @Param("mainBannerId", ParseIntPipe) mainBannerId: number,
    @Body() dto: UpdateMainBannerDto,
  ): Promise<Tables<"main_banners">> {
    return this.mainBannersService.updateMainBanner(mainBannerId, dto);
  }

  @CustomApiOperation({
    summary: "메인페이지 배너 추가",
    tags: ["admin-main-banners"],
  })
  @Post("/admin/main/banners")
  async createMainBanner(
    @Body() dto: CreateMainBannerDto,
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
