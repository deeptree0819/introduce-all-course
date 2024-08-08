import {
  AdminAdminsService,
  AdminRole,
  ApiError,
  OpenAPI,
  PaginatedAdminListDto,
} from "@generated/index";
import { useQuery } from "@tanstack/react-query";

import { PaginationDto } from "@/app/types/common";

interface AdminFindAllUsersWithPagination extends PaginationDto {
  role?: AdminRole;
  queryText?: string;
  page: number;
  itemsPerPage: number;
}

export const useGetAllAdminsWithPagination = (
  dto: AdminFindAllUsersWithPagination
) => {
  const { role, queryText, page, itemsPerPage } = dto;

  return useQuery<PaginatedAdminListDto, ApiError>({
    queryKey: ["admin", "admins", dto],
    queryFn: () =>
      AdminAdminsService.getAllAdminsWithPagination(
        role,
        queryText,
        page,
        itemsPerPage
      ),
    enabled: !!OpenAPI.TOKEN,
  });
};
