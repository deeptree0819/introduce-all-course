import { SetMetadata } from "@nestjs/common";
import { Enums } from "database.types";

export const Roles = (...roles: Enums<"admin_role">[]) =>
  SetMetadata("roles", roles);
