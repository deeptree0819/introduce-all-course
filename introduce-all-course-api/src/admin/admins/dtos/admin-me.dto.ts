import { Enums, Tables } from "@common/database.types";

export class AdminMeDto
  implements
    Pick<
      Tables<"admins">,
      "admin_id" | "admin_name" | "admin_role" | "admin_email" | "created_at"
    >
{
  admin_id: number;
  admin_name: string;
  admin_role: Enums<"admin_role">;
  admin_email: string;
  created_at: string;
}
