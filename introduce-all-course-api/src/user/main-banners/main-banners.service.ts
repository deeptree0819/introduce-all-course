import { SupabaseService } from "@common/supabase/supabase.service";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { MainBannerDto } from "./dtos/main-banner.dto";

@Injectable()
export class MainBannersService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async getAllMainBannersWithPagination(): Promise<MainBannerDto[]> {
    const client = this.supabaseService.getClient();
    const query = client
      .from("main_banners")
      .select(
        "main_banners_id, main_banner_url, main_banner_image_url, main_banner_image_name",
      )
      .lt("main_banner_open_at", new Date().toISOString())
      .or(`main_banner_close_at.is.null, main_banner_close_at.gt.now()`);

    const { data, error } = await query;

    if (error) {
      throw new InternalServerErrorException(
        error?.message || "메인베너 조회에 실패했습니다.",
      );
    }

    return plainToInstance(MainBannerDto, data);
  }
}
