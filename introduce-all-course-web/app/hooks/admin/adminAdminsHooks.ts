import {
  AdminAdminsService,
  ApiError,
  OpenAPI,
  PaginatedAdminListDto,
} from "@generated/index";
import { useQuery } from "@tanstack/react-query";

import { PaginationDto } from "@/app/types/common";

interface AdminFindAllUsersWithPagination extends PaginationDto {
  order?: "ASC" | "DESC";
  queryText?: string;
  page: number;
  itemsPerPage: number;
}

export const useGetAllAdminsWithPagination = (
  dto: AdminFindAllUsersWithPagination
) => {
  const { order, queryText, page, itemsPerPage } = dto;

  return useQuery<PaginatedAdminListDto, ApiError>({
    queryKey: ["admin", "admins", dto],
    queryFn: () =>
      AdminAdminsService.getAllAdmins(order, queryText, page, itemsPerPage),
    enabled: !!OpenAPI.TOKEN,
  });
};
