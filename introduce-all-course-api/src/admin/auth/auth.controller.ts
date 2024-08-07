import { AuthService } from "@admin/auth/auth.service";
import { CustomApiOperation } from "@common/decorators/api-operation.decorator";
import { Public } from "@common/decorators/public.decorator";
import { Body, Controller, Post, Req } from "@nestjs/common";
import { LoginResultDto } from "./dtos/login-result.dto";
import { LoginWithEmailDto } from "./dtos/login-with-email.dto";

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @CustomApiOperation({
    summary: "관리자 이메일 로그인",
    tags: ["admin-auth"],
  })
  @Public()
  @Post("/admin/login")
  async loginByEmail(
    @Body() dto: LoginWithEmailDto,
    @Req() req: Record<string, any>,
  ): Promise<LoginResultDto> {
    return this.authService.signInWithEmail(dto, req);
  }
}
