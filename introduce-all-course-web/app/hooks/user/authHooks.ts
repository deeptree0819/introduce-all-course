import { UserRecoverDto } from "@generated/models/UserRecoverDto";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toastError, toastSuccess } from "@toast";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

import { AuthService, OpenAPI } from "@/app/generated";

export const useLogout = () => {
  const queryClient = useQueryClient();

  return () => {
    queryClient.clear();
    deleteCookie("user.token");
    OpenAPI.TOKEN = "";
    signOut({ redirect: true, callbackUrl: "/" });
    toastSuccess("로그아웃 되었습니다.");
  };
};

export const useUserRecover = (dto: UserRecoverDto) => {
  const queryClient = useQueryClient();
  const { push } = useRouter();

  return useMutation({
    mutationFn: () => AuthService.userRecover(dto),
    onSuccess: () => {
      queryClient.clear();
      deleteCookie("recovery_token");
      OpenAPI.TOKEN = "";
      push("/login");
      toastSuccess("계정이 복구되었습니다.");
    },
    onError: () => {
      toastError("계정 복구에 실패하였습니다.");
    },
  });
};
