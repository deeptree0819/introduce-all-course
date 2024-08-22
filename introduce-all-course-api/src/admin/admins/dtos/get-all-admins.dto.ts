import { AdminRole } from "@common/enum";
import { PaginateDto } from "@common/pagination";
import { IsEnum, IsOptional, IsString } from "class-validator";

export class GetAllAdminsWithPaginationDto extends PaginateDto {
  @IsEnum(AdminRole)
  @IsOptional()
  role?: AdminRole;

  @IsString()
  @IsOptional()
  queryText?: string;
}
