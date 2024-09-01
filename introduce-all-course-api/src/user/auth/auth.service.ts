import { SupabaseService } from "@common/supabase/supabase.service";
import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import axios from "axios";
import { Request } from "express";
import { UserLoginDto } from "./dtos/user-login.dto";
import { UserDto } from "./dtos/user.dto";

@Injectable()
export class AuthService {
  constructor(private readonly supabaseService: SupabaseService) {}

  private async validateToken(
    token: string,
    provider: string,
  ): Promise<number | undefined> {
    let authUrl: string = "";
    switch (provider) {
      case "kakao": {
        authUrl = "https://kapi.kakao.com/v1/user/access_token_info";
        break;
      }

      default:
        return undefined;
    }

    try {
      const res = await axios.get(authUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data["id"];
    } catch (error) {
      return undefined;
    }
  }

  async validateUser(token: string, provider: string) {
    let userIdFieldaName: string = "";
    switch (provider) {
      case "kakao": {
        userIdFieldaName = "kakao_id";
        break;
      }

      default:
        return undefined;
    }

    const providerUserId = await this.validateToken(token, provider);
    if (!providerUserId) {
      return undefined;
    }

    const client = this.supabaseService.getClient();
    const { data, error } = await client
      .from("users")
      .select("users_id, nickname, role")
      .eq(userIdFieldaName, providerUserId)
      .maybeSingle();

    if (error || !data) {
      return undefined;
    }

    return data;
  }

  async signIn(dto: UserLoginDto, req: Request): Promise<void> {
    const { token, provider }: { token: string; provider: string } = JSON.parse(
      req.headers["authorization"]?.split(" ")[1],
    );
    const isAuthorized = await this.validateToken(token, provider);
    if (!isAuthorized)
      throw new UnauthorizedException("로그인을 실패하였습니다.");

    const { kakao_id } = dto;

    const client = this.supabaseService.getClient();
    const { data: existingUser, error: selectError } = await client
      .from("users")
      .select("users_id")
      .eq("kakao_id", kakao_id)
      .maybeSingle();

    if (selectError) {
      throw new InternalServerErrorException(
        selectError.message ?? "사용자 정보를 찾을 수 없습니다.",
      );
    }

    if (existingUser) {
      const ip = req.ips.length ? req.ips[0] : req.ip;
      const agent = req.headers["user-agent"];

      const { error } = await client.from("user_login_histories").insert({
        user_id: existingUser.users_id,
        ip,
        agent,
      });

      if (error) {
        // TODO: Log error
      }

      return;
    }

    const { error: upsertError } = await client.from("users").upsert(
      {
        ...dto,
        kakao_id: kakao_id,
        role: "USER",
      },
      { onConflict: "kakao_id" },
    );

    if (upsertError) {
      throw new InternalServerErrorException(
        selectError.message ?? "사용자 가입에 실패하였습니다.",
      );
    }

    return;
  }

  async getUserById(userId: number): Promise<UserDto> {
    const client = this.supabaseService.getClient();
    const { data, error } = await client
      .from("users")
      .select()
      .eq("users_id", userId)
      .maybeSingle();

    if (error || !data) {
      throw new Error("사용자 정보를 찾을 수 없습니다.");
    }

    return data;
  }
}
