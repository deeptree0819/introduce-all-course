import { z } from "zod";

export const CreateEventSchema = z.object({
  event_thumbnail_url: z
    .string({ required_error: "값을 입력해주세요." })
    .nonempty("값을 입력해주세요."),
  event_organization: z
    .string({ required_error: "값을 입력해주세요." })
    .max(60, "60자 이내로 입력해주세요.")
    .nonempty("값을 입력해주세요."),
  event_category_id: z
    .string({ required_error: "값을 입력해주세요." })
    .nonempty("값을 입력해주세요."),
  event_title: z
    .string({ required_error: "값을 입력해주세요." })
    .max(60, "60자 이내로 입력해주세요.")
    .nonempty("값을 입력해주세요."),
  event_start_at: z
    .string({ required_error: "값을 입력해주세요." })
    .nonempty("값을 입력해주세요.")
    .datetime(),
  event_end_at: z
    .string({ required_error: "값을 입력해주세요." })
    .nonempty("값을 입력해주세요.")
    .datetime(),
  event_poster_image_url: z
    .string({ required_error: "값을 입력해주세요." })
    .nonempty("값을 입력해주세요."),
  event_info: z
    .string({ required_error: "값을 입력해주세요." })
    .nonempty("값을 입력해주세요."),
  event_description: z
    .string({ required_error: "값을 입력해주세요." })
    .optional(),
});
