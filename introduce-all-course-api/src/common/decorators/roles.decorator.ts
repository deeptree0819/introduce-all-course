import { Enums } from "@common/database.types";
import { SetMetadata } from "@nestjs/common";

export const ROLES_KEY = "roles";
export const Roles = (...roles: Enums<"admin_role">[]) =>
  SetMetadata("roles", roles);
