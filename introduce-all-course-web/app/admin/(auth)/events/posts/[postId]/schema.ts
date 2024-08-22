import { z } from "zod";

export const UpdateEventSchema = z.object({
  event_thumbnail_url: z
    .string({ required_error: "값을 입력해주세요." })
    .nonempty("값을 입력해주세요.")
    .optional(),
  event_organization: z
    .string({ required_error: "값을 입력해주세요." })
    .max(60, "60자 이내로 입력해주세요.")
    .nonempty("값을 입력해주세요.")
    .optional(),
  event_category_id: z
    .string({ required_error: "값을 입력해주세요." })
    .nonempty("값을 입력해주세요.")
    .optional(),
  event_title: z
    .string({ required_error: "값을 입력해주세요." })
    .max(60, "60자 이내로 입력해주세요.")
    .nonempty("값을 입력해주세요.")
    .optional(),
  event_start_at: z
    .string({ required_error: "값을 입력해주세요." })
    .nonempty("값을 입력해주세요.")
    .datetime()
    .optional(),
  event_end_at: z
    .string({ required_error: "값을 입력해주세요." })
    .nonempty("값을 입력해주세요.")
    .datetime()
    .optional(),
  event_poster_image_url: z
    .string({ required_error: "값을 입력해주세요." })
    .nonempty("값을 입력해주세요.")
    .optional(),
  event_info: z
    .string({ required_error: "값을 입력해주세요." })
    .nonempty("값을 입력해주세요.")
    .optional(),
  event_description: z
    .string({ required_error: "값을 입력해주세요." })
    .optional(),
});
