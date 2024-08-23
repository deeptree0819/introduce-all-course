import { z } from "zod";

export const CreateAdminSchema = z
  .object({
    admin_role: z.enum(["SUPER", "MANAGER"], {
      required_error: "값을 선택해주세요.",
    }),
    admin_name: z
      .string({ required_error: "값을 입력해주세요." })
      .nonempty("값을 입력해주세요."),
    admin_email: z
      .string({ required_error: "값을 입력해주세요." })
      .nonempty("값을 입력해주세요.")
      .email("이메일 형식이 아닙니다."),
    admin_password: z
      .string({ required_error: "값을 입력해주세요." })
      .nonempty("값을 입력해주세요."),
    password_confirm: z
      .string({ required_error: "값을 입력해주세요." })
      .nonempty("값을 입력해주세요."),
  })
  .refine(
    (data) =>
      !data.admin_password || data.admin_password === data.password_confirm,
    {
      message: "비밀번호 확인이 일치하지 않습니다.",
      path: ["password_confirm"],
    }
  );
