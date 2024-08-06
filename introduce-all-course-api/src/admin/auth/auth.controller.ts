import { AuthService } from "@admin/auth/auth.service";
import { Public } from "@common/decorators/public.decorator";
import { Roles } from "@common/decorators/roles.decorator";
import { Body, Controller, Post, Req } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { LoginResultDto } from "./dtos/login-result.dto";
import { LoginWithEmailDto } from "./dtos/login-with-email.dto";

@Roles("SUPER")
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
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
