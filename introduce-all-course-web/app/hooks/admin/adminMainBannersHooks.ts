import {
  AdminMainBannersService,
  ApiError,
  OpenAPI,
  PaginatedMainBannerListDto,
} from "@generated/index";
import { useQuery } from "@tanstack/react-query";

import { PaginationDto } from "@/app/types/common";

export enum BannerStatus {
  BEFORE = "BEFORE",
  PROGRESS = "PROGRESS",
  AFTER = "AFTER",
}

interface GetAllMainBannesWithPaginationDto extends PaginationDto {
  status?: BannerStatus | undefined;
}

export const useGetAllMainBannersWithPagination = (
  dto: GetAllMainBannesWithPaginationDto
) => {
  const { status, page, itemsPerPage } = dto;

  return useQuery<PaginatedMainBannerListDto, ApiError>({
    queryKey: ["admin", "main", "banners", dto],
    queryFn: () =>
      AdminMainBannersService.getAllMainBannersWithPagination(
        status,
        page,
        itemsPerPage
      ),
    enabled: !!OpenAPI.TOKEN,
  });
};
