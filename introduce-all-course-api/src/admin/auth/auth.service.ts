import { SupabaseService } from "@common/supabase/supabase.service";
import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcrypt";
import { plainToInstance } from "class-transformer";
import { Tables } from "database.types";
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

    const { error } = await this.supabaseService
      .getClient()
      .from("admin_login_histories")
      .insert({
        admin_id: admin.admin_id,
        ip,
        agent,
      });

    if (error) {
      // TODO: Log error
    }

    return plainToInstance(LoginResultDto, {
      token: await this.generateAccessToken({
        adminId: admin.admin_id,
        adminName: admin.admin_name,
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
      throw new InternalServerErrorException(error.message);
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
  }: {
    adminId: number;
    adminName: string;
  }) {
    const payload = { sub: adminId, username: adminName };
    return this.jwtService.sign(payload);
  }
}
