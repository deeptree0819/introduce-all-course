import { Tables } from "@common/database.types";
import { Paginated } from "@common/pagination";
import { SupabaseService } from "@common/supabase/supabase.service";
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { CreateMainBannerDto } from "./dtos/create-main-banner.dto";
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

    const now = new Date().toISOString();
    if (dto.status === "BEFORE") {
      query.gt("main_banner_open_at", now);
    } else if (dto.status === "AFTER") {
      query.lt("main_banner_close_at", now);
    } else if (dto.status === "PROGRESS") {
      query
        .lt("main_banner_open_at", now)
        .or(`main_banner_close_at.is.null, main_banner_close_at.gt.now()`);
    }

    query
      .order("main_banners_id", { ascending: false })
      .range(
        (dto.page - 1) * dto.itemsPerPage,
        dto.page * dto.itemsPerPage - 1,
      );

    const { data, error } = await query;

    if (error) {
      throw new InternalServerErrorException(
        error?.message || "메인베너 조회에 실패했습니다.",
      );
    }

    const { count, error: countError } = await client
      .from("main_banners")
      .select("main_banners_id", { count: "exact", head: true });

    if (countError) {
      throw new InternalServerErrorException(
        countError?.message || "전체 개수 조회에 실패하였습니다.",
      );
    }

    return new Paginated(
      plainToInstance(MainBannerSummaryDto, data),
      count,
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
      throw new InternalServerErrorException(
        error?.message || "메인베너 조회에 실패했습니다.",
      );
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

    if (selectError || !mainBanner) {
      throw new NotFoundException(
        selectError?.message || "해당 배너가 존재하지 않습니다.",
      );
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
      (dto.main_banner_close_at ?? mainBanner.main_banner_close_at) || null;
    mainBanner.updated_at = new Date().toISOString();

    const { data, error: updateError } = await client
      .from("main_banners")
      .update(mainBanner)
      .eq("main_banners_id", mainBannersId)
      .select()
      .maybeSingle();

    if (updateError || !data) {
      throw new InternalServerErrorException(
        updateError?.message || "수정에 실패했습니다.",
      );
    }

    return data;
  }

  async createMainBanner(
    dto: CreateMainBannerDto,
  ): Promise<Tables<"main_banners">> {
    const client = this.supabaseService.getClient();
    const { data, error } = await client
      .from("main_banners")
      .insert(dto)
      .select()
      .maybeSingle();

    if (error || !data) {
      throw new NotFoundException(error?.message || "생성에 실패했습니다.");
    }

    return data;
  }

  async deleteMainBanner(mainBannersId: number): Promise<void> {
    const client = this.supabaseService.getClient();
    const { error } = await client
      .from("main_banners")
      .delete()
      .eq("main_banners_id", mainBannersId);

    if (error) {
      throw new InternalServerErrorException(
        error?.message || "삭제에 실패했습니다.",
      );
    }
  }
}
