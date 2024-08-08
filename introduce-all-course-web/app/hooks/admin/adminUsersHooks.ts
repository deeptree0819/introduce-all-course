import {
  AdminUsersService,
  ApiError,
  OpenAPI,
  PaginatedUserListDto,
  Role,
} from "@generated/index";
import { useQuery } from "@tanstack/react-query";

import { PaginationDto } from "@/app/types/common";

interface AdminFindAllUsersWithPagination extends PaginationDto {
  role?: Role;
  queryText?: string;
  page: number;
  itemsPerPage: number;
}

export const useGetAllUsersWithPagination = (
  dto: AdminFindAllUsersWithPagination
) => {
  const { role, queryText, page, itemsPerPage } = dto;

  return useQuery<PaginatedUserListDto, ApiError>({
    queryKey: ["admin", "users", dto],
    queryFn: () =>
      AdminUsersService.getAllUsersWithPagination(
        role,
        queryText,
        page,
        itemsPerPage
      ),
    enabled: !!OpenAPI.TOKEN,
  });
};
