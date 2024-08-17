import { Order } from "@common/enum";
import { PaginateDto } from "@common/pagination";
import { IsEnum, IsOptional, IsString } from "class-validator";

export class GetAllEventsWithPaginationDto extends PaginateDto {
  @IsEnum(Order)
  @IsOptional()
  order?: Order;

  @IsEnum({
    created_at: "created_at",
    event_end_at: "event_end_at",
    event_view_count: "event_view_count",
  })
  @IsOptional()
  orderBy?: "created_at" | "event_end_at" | "event_view_count";

  @IsString()
  @IsOptional()
  queryText?: string;
}
