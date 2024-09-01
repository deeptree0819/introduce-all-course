import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Request } from "express";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();
    const { token, provider }: { token: string; provider: string } = JSON.parse(
      request.headers["authorization"]?.split(" ")[1],
    );

    if (!token || !provider) {
      throw new UnauthorizedException("로그인이 만료되었습니다.");
    }

    const user = await this.authService.validateUser(token, provider);
    if (!user) {
      throw new UnauthorizedException("로그인이 만료되었습니다.");
    }

    request.user = user;
    return true;
  }
}
