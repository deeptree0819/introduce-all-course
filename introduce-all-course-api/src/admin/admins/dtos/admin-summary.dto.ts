import { Enums, Tables } from "@common/database.types";
import { AdminRole } from "@common/enum";
import { ApiProperty } from "@nestjs/swagger";

export class AdminSummaryDto
  implements
    Pick<
      Tables<"admins">,
      "admin_id" | "admin_name" | "admin_role" | "admin_email" | "created_at"
    >
{
  admin_id: number;
  admin_name: string;
  @ApiProperty({ enum: AdminRole, enumName: "AdminRole" })
  admin_role: Enums<"admin_role">;
  admin_email: string;
  created_at: string;
}
