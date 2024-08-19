import { z } from "zod";

export const UpdateMainBannerSchema = z.object({
  main_banner_url: z.string().nonempty("값을 입력해주세요.").optional(),
  main_banner_image_url: z.string().nonempty("값을 입력해주세요.").optional(),
  main_banner_image_name: z.string().nonempty("값을 입력해주세요.").optional(),
  main_banner_open_at: z
    .string()
    .nonempty("값을 입력해주세요.")
    .datetime()
    .optional(),
  main_banner_close_at: z.string().optional(),
});
