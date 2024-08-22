import { z } from "zod";

export const CreateFreeLectureSchema = z.object({
  free_lecture_title: z
    .string({ required_error: "값을 입력해주세요." })
    .max(60, "60자 이내로 입력해주세요.")
    .nonempty("값을 입력해주세요."),
  free_lecture_url: z
    .string({ required_error: "값을 입력해주세요." })
    .nonempty("값을 입력해주세요."),
  free_lecture_tags: z
    .array(z.coerce.number(), { required_error: "값을 선택해주세요." })
    .nonempty("값을 하나 이상 선택해주세요."),
  free_lecture_thumbnail_url: z
    .string({ required_error: "값을 입력해주세요." })
    .nonempty("값을 입력해주세요."),
  free_lecture_description: z.string().optional(),
});
