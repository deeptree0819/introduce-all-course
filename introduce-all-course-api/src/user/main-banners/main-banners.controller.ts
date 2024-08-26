import { JwtAuthGuard } from "@admin/auth/jwt-auth.guard";
import { CustomApiOperation } from "@common/decorators/api-operation.decorator";
import { RolesGuard } from "@common/guards/roles.guard";
import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { MainBannerDto } from "./dtos/main-banner.dto";
import { MainBannersService } from "./main-banners.service";

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@Controller()
export class MainBannersController {
  constructor(private readonly mainBannersService: MainBannersService) {}

  @CustomApiOperation({
    summary: "메인페이지 배너 목록 조회",
    tags: ["main-banners"],
  })
  @Get("/main/banners")
  async getAllMainBannersWithPagination(): Promise<MainBannerDto[]> {
    return this.mainBannersService.getAllMainBannersWithPagination();
  }
}
