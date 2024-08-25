import { EventsOrderBy, Order } from "@common/enum";
import { PaginateDto } from "@common/pagination";
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional } from "class-validator";

export class GetAllEventsWithPaginationDto extends PaginateDto {
  @IsEnum(Order)
  @ApiProperty({ enum: Order, enumName: "Order" })
  @IsOptional()
  order?: Order;

  @IsEnum(EventsOrderBy)
  @ApiProperty({ enum: EventsOrderBy, enumName: "EventsOrderBy" })
  @IsOptional()
  orderBy?: EventsOrderBy;

  @IsNumber()
  @IsOptional()
  eventCategoryId?: Array<number>;
}