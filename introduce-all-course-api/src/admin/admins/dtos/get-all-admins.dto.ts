import { Order } from "@common/enum";
import { PaginateDto } from "@common/pagination";
import { IsEnum, IsOptional, IsString } from "class-validator";

export class GetAllAdminsWithPaginationDto extends PaginateDto {
  @IsEnum(Order)
  @IsOptional()
  order?: Order;

  @IsString()
  @IsOptional()
  queryText?: string;
}
