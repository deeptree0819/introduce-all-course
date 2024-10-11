import { Enums, Tables } from "@common/database.types";
import { SupabaseService } from "@common/supabase/supabase.service";
import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcrypt";
import { plainToInstance } from "class-transformer";
import { LoginResultDto } from "./dtos/login-result.dto";
import { LoginWithEmailDto } from "./dtos/login-with-email.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly supabaseService: SupabaseService,
  ) {}

  async signInWithEmail(
    dto: LoginWithEmailDto,
    req: Record<string, any>,
  ): Promise<LoginResultDto> {
    const admin = await this.authWithEmail(dto.email, dto.password);

    const ip = req.ips.length ? req.ips[0] : req.ip;
    const agent = req.headers["user-agent"];

    const client = this.supabaseService.getClient();
    const { error } = await client.from("admin_login_histories").insert({
      admin_id: admin.admin_id,
      ip,
      agent,
    });

    if (error) {
      console.error(error);
    }

    return plainToInstance(LoginResultDto, {
      token: await this.generateAccessToken({
        adminId: admin.admin_id,
        adminName: admin.admin_name,
        adminRole: admin.admin_role,
      }),
    });
  }

  async authWithEmail(
    email: string,
    password: string,
  ): Promise<Tables<"admins">> {
    const client = this.supabaseService.getClient();
    const { data: admin, error } = await client
      .from("admins")
      .select("*")
      .eq("admin_email", email)
      .maybeSingle();

    if (error) {
      throw new InternalServerErrorException(
        error?.message || "로그인 서버에 문제가 발생했습니다.",
      );
    }

    if (!admin) {
      throw new UnauthorizedException(
        "이메일 또는 비밀번호가 올바르지 않습니다.",
      );
    }

    const isAuthenticated = await compare(password, admin.admin_password);

    if (!isAuthenticated) {
      throw new UnauthorizedException(
        "이메일 또는 비밀번호가 올바르지 않습니다.",
      );
    }

    return admin;
  }

  async generateAccessToken({
    adminId,
    adminName,
    adminRole,
  }: {
    adminId: number;
    adminName: string;
    adminRole: Enums<"admin_role">;
  }) {
    const payload = {
      sub: adminId,
      username: adminName,
      roles: [adminRole],
    };
    return this.jwtService.sign(payload);
  }
}
