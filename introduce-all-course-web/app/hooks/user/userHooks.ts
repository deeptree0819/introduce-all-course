import {
  ApiError,
  AuthService,
  OpenAPI,
  UpdateUserDto,
  UserDto,
  UsersService,
} from "@generated/index";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toastApiError, toastSuccess } from "@toast";
import { deleteCookie, getCookie } from "cookies-next";
import { signOut } from "next-auth/react";

export const useFindMe = () => {
  OpenAPI.TOKEN = getCookie("user.token");

  return useQuery<UserDto, ApiError>({
    queryKey: ["user", "me"],
    queryFn: () => AuthService.findMe(),
    enabled: !!OpenAPI.TOKEN,
  });
};

export const useUpdateMe = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: UpdateUserDto) => AuthService.updateMe(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "me"] });
      toastSuccess("사용자 정보가 수정되었습니다.");
    },
    onError: (error: ApiError) => {
      toastApiError(error, "사용자 정보 수정에 실패했습니다.");
    },
  });
};

export const useDeleteMe = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const { users_id } = await AuthService.findMe();
      return UsersService.deleteUser(users_id);
    },
    onSuccess: () => {
      queryClient.clear();
      deleteCookie("user.token");
      OpenAPI.TOKEN = "";
      signOut({ redirect: true, callbackUrl: "/" });
      toastSuccess("회원 탈퇴가 완료되었습니다.");
    },
    onError: (error: ApiError) => {
      toastApiError(error, "회원 탈퇴에 실패했습니다.");
    },
  });
};
