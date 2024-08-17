import { Tables } from "@common/database.types";

export class MainBannerSummaryDto
  implements Omit<Tables<"main_banners">, "created_at" | "updated_at">
{
  main_banners_id: number;
  main_banner_url: string;
  main_banner_image_url: string;
  main_banner_image_name: string;
  main_banner_open_at: string;
  main_banner_close_at: string;
}
