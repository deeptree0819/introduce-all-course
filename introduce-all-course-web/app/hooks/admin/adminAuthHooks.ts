import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toastApiError, toastSuccess } from "@toast";
import { deleteCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

import {
  AdminAuthService,
  ApiError,
  LoginResultDto,
  LoginWithEmailDto,
  OpenAPI,
} from "@/app/generated";

export const useAdminLoginByEmail = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation<LoginResultDto, ApiError, LoginWithEmailDto>({
    mutationFn: (requestBody) => AdminAuthService.loginByEmail(requestBody),
    onSuccess: async (data) => {
      OpenAPI.TOKEN = data.token;
      //   TODO: 추후에 me를 가져오는 API를 연결해야함
      //   const me = await AuthService.findMe();
      setCookie("adminToken", data.token, {
        maxAge: 60 * 60 * 24 * 30,
        expires: new Date(Date.now() + 60 * 60 * 24 * 30 * 1000),
      });
      toastSuccess("로그인에 성공했습니다.");
      queryClient.invalidateQueries({ queryKey: ["admin", "users", "me"] });
      //   queryClient.setQueryData(["admin", "users", "me"], me);
      router.replace("/admin/users");
    },
    onError: (error) => {
      toastApiError(error, "로그인에 실패했습니다.");
    },
  });
};

export const useAdminLogout = () => {
  const { replace, refresh } = useRouter();
  const queryClient = useQueryClient();

  return () => {
    queryClient.clear();
    deleteCookie("adminToken");
    OpenAPI.TOKEN = "";
    toastSuccess("로그아웃 되었습니다.");
    replace("/admin/login");
    refresh();
  };
};
