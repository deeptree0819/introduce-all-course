import { Enums, Tables } from "@common/database.types";
import { AdminRole } from "@common/enum";
import { ApiProperty } from "@nestjs/swagger";

export class AdminDto implements Tables<"admins"> {
  admin_id: number;
  admin_name: string;
  @ApiProperty({ enum: AdminRole, enumName: "AdminRole" })
  admin_role: Enums<"admin_role">;
  admin_email: string;
  created_at: string;
  updated_at: string;
  admin_password: string;
  admin_phone: string;
}
