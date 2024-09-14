import { z } from "zod";

export const CreateMainBannerSchema = z.object({
  main_banner_url: z
    .string({ required_error: "값을 입력해주세요." })
    .nonempty("값을 입력해주세요."),
  main_banner_image_url: z
    .string({ required_error: "값을 입력해주세요." })
    .nonempty("값을 입력해주세요."),
  main_banner_image_name: z
    .string({ required_error: "값을 입력해주세요." })
    .nonempty("값을 입력해주세요."),
  main_banner_open_at: z
    .string({ required_error: "값을 입력해주세요." })
    .nonempty("값을 입력해주세요.")
    .datetime(),
  main_banner_close_at: z.string().nullable().optional(),
});
