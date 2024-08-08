import { Role } from "@common/enum";
import { PaginateDto } from "@common/pagination";
import { IsEnum, IsOptional, IsString } from "class-validator";

export class GetAllUsersWithPaginationDto extends PaginateDto {
  @IsEnum(Role)
  @IsOptional()
  role?: Role;

  @IsString()
  @IsOptional()
  queryText?: string;
}
