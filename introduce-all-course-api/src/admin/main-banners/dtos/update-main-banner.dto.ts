import { Tables } from "@common/database.types";

export class UpdateMainBannerDto
  implements
    Partial<
      Omit<
        Tables<"main_banners">,
        "main_banners_id" | "created_at" | "updated_at"
      >
    >
{
  main_banner_url?: string;
  main_banner_image_url?: string;
  main_banner_image_name?: string;
  main_banner_open_at?: string;
  main_banner_close_at?: string;
}
