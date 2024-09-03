import { Enums, Tables } from "@common/database.types";
import { Gender, Role } from "@common/enum";
import { ApiProperty } from "@nestjs/swagger";

export class AdminUpdateUserDto
  implements
    Partial<
      Omit<
        Tables<"users">,
        | "users_id"
        | "created_at"
        | "updated_at"
        | "kakao_id"
        | "kakao_access_token"
      >
    >
{
  nickname?: string;
  @ApiProperty({ enum: Role, enumName: "Role" })
  role?: Enums<"role">;
  profile_url?: string;
  profile_thumbnail_url?: string;
  gender?: Gender;
  user_name?: string;
  email?: string;
  birthyear?: string;
  phone_number?: string;
}
