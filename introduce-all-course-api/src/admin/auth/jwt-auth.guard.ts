import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  handleRequest(err, user) {
    if (err || !user) {
      throw new UnauthorizedException("로그인이 만료되었습니다.");
    }
    return user;
  }
}
