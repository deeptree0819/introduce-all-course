import {
  AdminUpdateUserDto,
  AdminUsersService,
  ApiError,
  OpenAPI,
  PaginatedUserListDto,
  Role,
  UserDto,
} from "@generated/index";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toastApiError, toastSuccess } from "@toast";
import { useRouter } from "next/navigation";

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

export const useGetUserById = (userId: number) => {
  return useQuery<UserDto, ApiError>({
    queryKey: ["admin", "users", userId],
    queryFn: () => AdminUsersService.getUserById(userId),
    enabled: !!OpenAPI.TOKEN,
  });
};

export const useUpdateUser = (userId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: AdminUpdateUserDto) =>
      AdminUsersService.updateUser(userId, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
      toastSuccess("사용자 정보가 수정되었습니다.");
    },
    onError: (error: ApiError) => {
      toastApiError(error, "사용자 정보 수정에 실패했습니다.");
    },
  });
};

export const useDeleteUser = () => {
  const { push } = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: number) => AdminUsersService.deleteUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
      toastSuccess("사용자가 삭제되었습니다.");
      push("/admin/users");
    },
    onError: (error: ApiError) => {
      toastApiError(error, "사용자 삭제에 실패했습니다.");
    },
  });
};
