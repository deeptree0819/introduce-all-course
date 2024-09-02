import { z } from "zod";

export const UpdateUserSchema = z.object({
  nickname: z.string().nonempty("값을 입력해주세요.").optional(),
  profile_url: z.string().optional(),
  gender: z.enum(["MALE", "FEMALE"]).optional(),
  email: z.string().nonempty("값을 입력해주세요.").optional(),
  birthyear: z.string().nonempty("값을 입력해주세요.").optional(),
});
