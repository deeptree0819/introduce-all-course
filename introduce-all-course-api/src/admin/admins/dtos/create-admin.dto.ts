import { Enums, Tables } from "@common/database.types";
import { Role } from "@common/enum";
import { ApiProperty } from "@nestjs/swagger";

export class CreateAdminDto
  implements
    Partial<Omit<Tables<"admins">, "admin_id" | "created_at" | "updated_at">>
{
  admin_name: string;
  @ApiProperty({ enum: Role, enumName: "Role" })
  admin_role: Enums<"admin_role">;
  admin_email: string;
  admin_password: string;
}
