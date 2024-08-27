import { CustomApiOperation } from "@common/decorators/api-operation.decorator";
import { Controller, Get } from "@nestjs/common";
import { MainBannerDto } from "./dtos/main-banner.dto";
import { MainBannersService } from "./main-banners.service";

@Controller()
export class MainBannersController {
  constructor(private readonly mainBannersService: MainBannersService) {}

  @CustomApiOperation({
    summary: "메인페이지 배너 목록 조회",
    tags: ["main-banners"],
  })
  @Get("/main/banners")
  async getAllMainBanners(): Promise<MainBannerDto[]> {
    return this.mainBannersService.getAllMainBanners();
  }
}
