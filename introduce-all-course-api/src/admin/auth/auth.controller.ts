import { AdminsService } from "@admin/admins/admins.service";
import { AdminDto } from "@admin/admins/dtos/admin.dto";
import { AuthService } from "@admin/auth/auth.service";
import { CustomApiOperation } from "@common/decorators/api-operation.decorator";
import { CurrentUser } from "@common/decorators/current-user.decorator";
import { Public } from "@common/decorators/public.decorator";
import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { LoginResultDto } from "./dtos/login-result.dto";
import { LoginWithEmailDto } from "./dtos/login-with-email.dto";

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly adminsService: AdminsService,
  ) {}

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

  @CustomApiOperation({
    summary: "내 정보 조회",
    tags: ["admins"],
  })
  @ApiBearerAuth()
  @Get("/admins/me")
  async findMe(@CurrentUser() me): Promise<AdminDto> {
    return this.adminsService.getAdminById(me.userId);
  }
}
