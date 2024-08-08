import { Enums, Tables } from "@common/database.types";
import { Role } from "@common/enum";
import { ApiProperty } from "@nestjs/swagger";

export class UserSummaryDto
  implements
    Pick<
      Tables<"users">,
      | "users_id"
      | "role"
      | "user_name"
      | "nickname"
      | "email"
      | "phone_number"
      | "created_at"
    >
{
  users_id: number;
  @ApiProperty({ enum: Role, enumName: "Role" })
  role: Enums<"role">;
  user_name: string;
  nickname: string;
  email: string;
  phone_number: string;
  created_at: string;
}
