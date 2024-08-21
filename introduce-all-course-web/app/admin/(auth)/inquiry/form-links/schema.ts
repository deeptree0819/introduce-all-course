import { z } from "zod";

export const CreateInquiryFormLinkSchema = z.object({
  inquiry_form_links_url: z
    .string({
      required_error: "새로운 값을 입력해주세요.",
    })
    .url({ message: "URL 형식이 아닙니다." })
    .nonempty({ message: "값을 입력해주세요." }),
});
