import { z } from "zod";

export const AdminLoginUserWithEmailSchema = z.object({
  email: z
    .string({
      required_error: "이메일을 입력해주세요.",
    })
    .email({ message: "이메일 형식이 아닙니다." })
    .nonempty({ message: "이메일을 입력해주세요." }),
  password: z
    .string({ required_error: "비밀번호를 입력해주세요." })
    .nonempty({ message: "비밀번호를 입력해주세요." }),
});
