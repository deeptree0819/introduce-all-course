import { Enums, Tables } from "@common/database.types";
import { Gender, Role } from "@common/enum";
import { ApiProperty } from "@nestjs/swagger";

export class UserDto implements Omit<Tables<"users">, "kakao_access_token"> {
  users_id: number;
  created_at: string;
  updated_at: string;
  nickname: string;
  @ApiProperty({ enum: Role, enumName: "Role" })
  role: Enums<"role">;
  profile_url: string;
  profile_thumbnail_url: string;
  kakao_id: number;
  @ApiProperty({ enum: Gender, enumName: "Gender" })
  gender: Enums<"gender">;
  user_name: string;
  email: string;
  birthyear: string;
  phone_number: string;
}
