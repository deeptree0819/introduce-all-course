import { BannerStatus } from "@common/enum";
import { PaginateDto } from "@common/pagination";
import { IsEnum, IsOptional } from "class-validator";

export class AdminGetAllMainBannesWithPaginationDto extends PaginateDto {
  @IsEnum(BannerStatus)
  @IsOptional()
  status?: BannerStatus;
}
