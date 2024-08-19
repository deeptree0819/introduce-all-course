import { z } from "zod";

export const UpdateUserSchema = z.object({
  role: z.enum(["SUPER", "MANAGER", "USER", "EXPERT"]).optional(),
  nickname: z.string().nonempty("값을 입력해주세요.").optional(),
  profile_url: z.string().optional(),
  profile_thumbnail_url: z.string().nonempty("값을 입력해주세요.").optional(),
  gender: z.enum(["MALE", "FEMALE"]).optional(),
  user_name: z.string().nonempty("값을 입력해주세요.").optional(),
  email: z.string().nonempty("값을 입력해주세요.").optional(),
  birthyear: z.string().nonempty("값을 입력해주세요.").optional(),
  phone_number: z.string().nonempty("값을 입력해주세요.").optional(),
});
