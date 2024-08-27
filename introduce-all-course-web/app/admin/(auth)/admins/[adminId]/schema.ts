import { z } from "zod";

export const UpdateAdminSchema = z
  .object({
    admin_role: z.enum(["SUPER", "MANAGER"]).optional(),
    admin_name: z.string().nonempty("값을 입력해주세요.").optional(),
    admin_email: z
      .string()
      .nonempty("값을 입력해주세요.")
      .email("이메일 형식이 아닙니다.")
      .optional(),
    admin_password: z.string().optional(),
    password_confirm: z.string().optional(),
  })
  .refine(
    (data) =>
      !data.admin_password || data.admin_password === data.password_confirm,
    {
      message: "비밀번호 확인이 일치하지 않습니다.",
      path: ["password_confirm"],
    }
  );
