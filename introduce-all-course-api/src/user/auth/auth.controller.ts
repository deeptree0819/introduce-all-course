import { CustomApiOperation } from "@common/decorators/api-operation.decorator";
import { CurrentUser } from "@common/decorators/current-user.decorator";
import { Public } from "@common/decorators/public.decorator";
import { RolesGuard } from "@common/guards/roles.guard";
import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { Request } from "express";
import { AuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";
import { UserLoginDto } from "./dtos/user-login.dto";
import { UserDto } from "./dtos/user.dto";

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @CustomApiOperation({
    summary: "로그인 및 가입",
    tags: ["auth"],
  })
  @Public()
  @Post("/login")
  async loginByEmail(
    @Body() dto: UserLoginDto,
    @Req() req: Request,
  ): Promise<void> {
    return this.authService.signIn(dto, req);
  }

  @CustomApiOperation({
    summary: "내 정보 조회",
    tags: ["auth"],
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Get("/me")
  async findMe(@CurrentUser() me): Promise<UserDto> {
    return this.authService.getUserById(me.userId);
  }
}
