import { Tables } from "@common/database.types";

export class MainBannerDto
  implements
    Pick<
      Tables<"main_banners">,
      | "main_banners_id"
      | "main_banner_url"
      | "main_banner_image_url"
      | "main_banner_image_name"
    >
{
  main_banners_id: number;
  main_banner_url: string;
  main_banner_image_url: string;
  main_banner_image_name: string;
}
