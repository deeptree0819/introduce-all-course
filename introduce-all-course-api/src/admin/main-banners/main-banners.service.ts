import { Tables } from "@common/database.types";
import { Paginated } from "@common/pagination";
import { SupabaseService } from "@common/supabase/supabase.service";
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { GetAllMainBannesWithPaginationDto } from "./dtos/get-all-main-banners.dto";
import { MainBannerSummaryDto } from "./dtos/main-banner-summary.dto";
import { MainBannerDto } from "./dtos/main-banner.dto";
import { UpdateMainBannerDto } from "./dtos/update-main-banner.dto";

@Injectable()
export class MainBannersService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async getAllMainBannersWithPagination(
    dto: GetAllMainBannesWithPaginationDto,
  ): Promise<Paginated<MainBannerSummaryDto>> {
    const client = this.supabaseService.getClient();
    const query = client
      .from("main_banners")
      .select(
        "main_banners_id, main_banner_url, main_banner_image_url, main_banner_image_name, main_banner_open_at, main_banner_close_at",
      );

    // TODO: find how to or the open_at and close_at to be the status
    if (dto.status) query.eq("main_banner_open_at", dto.status);

    query
      .order("main_banner_open_at", { ascending: false })
      .range(
        (dto.page - 1) * dto.itemsPerPage,
        dto.page * dto.itemsPerPage - 1,
      );

    const { data, error } = await query;

    if (error) {
      throw new InternalServerErrorException(error.message);
    }

    return new Paginated(
      plainToInstance(MainBannerSummaryDto, data),
      data.length,
      dto.page,
      dto.itemsPerPage,
    );
  }

  async getMainBannerById(mainBannersId: number): Promise<MainBannerDto> {
    const client = this.supabaseService.getClient();
    const { data, error } = await client
      .from("main_banners")
      .select()
      .eq("main_banners_id", mainBannersId)
      .maybeSingle();

    if (error) {
      throw new InternalServerErrorException(error.message);
    }

    if (!data) {
      throw new NotFoundException("해당 배너가 존재하지 않습니다.");
    }

    return plainToInstance(MainBannerDto, data);
  }

  async updateMainBanner(
    mainBannersId: number,
    dto: UpdateMainBannerDto,
  ): Promise<Tables<"main_banners">> {
    const client = this.supabaseService.getClient();
    const { data: mainBanner, error: selectError } = await client
      .from("main_banners")
      .select()
      .eq("main_banners_id", mainBannersId)
      .maybeSingle();

    if (selectError || mainBanner) {
      throw new NotFoundException(selectError.message);
    }

    mainBanner.main_banner_url =
      dto.main_banner_url ?? mainBanner.main_banner_url;
    mainBanner.main_banner_image_url =
      dto.main_banner_image_url ?? mainBanner.main_banner_image_url;
    mainBanner.main_banner_image_name =
      dto.main_banner_image_name ?? mainBanner.main_banner_image_name;
    mainBanner.main_banner_open_at =
      dto.main_banner_open_at ?? mainBanner.main_banner_open_at;
    mainBanner.main_banner_close_at =
      dto.main_banner_close_at ?? mainBanner.main_banner_close_at;
    mainBanner.updated_at = new Date().toISOString();

    const { data, error: updateError } = await client
      .from("main_banners")
      .update(mainBanner)
      .eq("main_banners_id", mainBannersId)
      .select()
      .maybeSingle();

    if (updateError || !data) {
      throw new InternalServerErrorException(updateError.message);
    }

    return data;
  }

  async createMainBanner(
    dto: UpdateMainBannerDto,
  ): Promise<Tables<"main_banners">> {
    const mainBanner = {
      main_banner_url: dto.main_banner_url,
      main_banner_image_url: dto.main_banner_image_url,
      main_banner_image_name: dto.main_banner_image_name,
      main_banner_open_at: dto.main_banner_open_at,
      main_banner_close_at: dto.main_banner_close_at,
    };

    const client = this.supabaseService.getClient();
    const { data, error } = await client
      .from("main_banners")
      .insert(mainBanner)
      .select()
      .maybeSingle();
    // TODO: how to select inserted row

    if (error || mainBanner) {
      throw new NotFoundException(error.message);
    }

    return data;
  }
}
