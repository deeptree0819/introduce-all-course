import {
  AdminAdminsService,
  AdminDto,
  AdminRole,
  ApiError,
  OpenAPI,
  PaginatedAdminListDto,
  UpdateAdminDto,
} from "@generated/index";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toastApiError, toastSuccess } from "@toast";

import { PaginationDto } from "@/app/types/common";

interface AdminFindAllAdminsWithPaginationDto extends PaginationDto {
  role?: AdminRole;
  queryText?: string;
  page: number;
  itemsPerPage: number;
}

export const useGetAllAdminsWithPagination = (
  dto: AdminFindAllAdminsWithPaginationDto
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

export const useGetAdminById = (adminId: number) => {
  return useQuery<AdminDto, ApiError>({
    queryKey: ["admin", "admins", adminId],
    queryFn: () => AdminAdminsService.getAdminById(adminId),
    enabled: !!OpenAPI.TOKEN,
  });
};

export const useUpdateAdmin = (adminId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: UpdateAdminDto) =>
      AdminAdminsService.updateAdmin(adminId, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "admins"] });
      toastSuccess("어드민 정보가 수정되었습니다.");
    },
    onError: (error: ApiError) => {
      toastApiError(error, "어드민 정보 수정에 실패했습니다.");
    },
  });
};
