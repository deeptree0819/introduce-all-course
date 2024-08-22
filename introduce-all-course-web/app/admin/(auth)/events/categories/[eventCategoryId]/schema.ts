import { z } from "zod";

export const DeleteEventCategorySchema = z.object({
  move_category_id: z.coerce.number({
    required_error: "값을 입력해주세요.",
  }),
});
