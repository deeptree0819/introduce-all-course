import { Tables } from "@common/database.types";

export class AdminMainBannerDto implements Tables<"main_banners"> {
  created_at: string;
  updated_at: string;
  main_banners_id: number;
  main_banner_url: string;
  main_banner_image_url: string;
  main_banner_image_name: string;
  main_banner_open_at: string;
  main_banner_close_at: string;
}
