import { z } from "zod";

export const CreateFreeLectureTagSchema = z.object({
  free_lecture_tag_name: z
    .string({
      required_error: "값을 입력해주세요.",
    })
    .nonempty({ message: "값을 입력해주세요." }),
});
