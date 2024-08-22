import { z } from "zod";

export const CreateEventCategorySchema = z.object({
  event_category_name: z
    .string({
      required_error: "값을 입력해주세요.",
    })
    .nonempty({ message: "값을 입력해주세요." }),
});
