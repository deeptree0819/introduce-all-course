import {
  ApiError,
  AuthService,
  OpenAPI,
  UpdateUserDto,
  UserDto,
} from "@generated/index";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toastApiError, toastSuccess } from "@toast";
import { getCookie } from "cookies-next";

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
