import { FreeLecturesOrderBy, Order } from "@common/enum";
import { PaginateDto } from "@common/pagination";
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString } from "class-validator";

export class GetAllFreeLecturesWithPaginationDto extends PaginateDto {
  @IsEnum(Order)
  @ApiProperty({ enum: Order, enumName: "Order" })
  @IsOptional()
  order?: Order;

  @IsEnum(FreeLecturesOrderBy)
  @ApiProperty({ enum: FreeLecturesOrderBy, enumName: "FreeLecturesOrderBy" })
  @IsOptional()
  orderBy?: FreeLecturesOrderBy;

  @IsString()
  @IsOptional()
  queryText?: string;

  @IsString()
  @IsOptional()
  freeLectureTagId?: string;
}
