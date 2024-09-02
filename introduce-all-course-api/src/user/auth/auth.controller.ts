import { Tables } from "@common/database.types";
import { CustomApiOperation } from "@common/decorators/api-operation.decorator";
import { CurrentUser } from "@common/decorators/current-user.decorator";
import { Public } from "@common/decorators/public.decorator";
import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { UsersService } from "@user/users/users.service";
import { Request } from "express";
import { AuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";
import { UserLoginDto } from "./dtos/user-login.dto";

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @CustomApiOperation({
    summary: "로그인 및 가입",
    tags: ["auth"],
  })
  @Public()
  @Post("/login")
  async signIn(@Body() dto: UserLoginDto, @Req() req: Request): Promise<void> {
    return this.authService.signIn(dto, req);
  }

  @CustomApiOperation({
    summary: "내 정보 조회",
    tags: ["auth"],
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get("/me")
  async findMe(@CurrentUser() me): Promise<Tables<"users">> {
    return this.usersService.getUserById(me.users_id);
  }
}
