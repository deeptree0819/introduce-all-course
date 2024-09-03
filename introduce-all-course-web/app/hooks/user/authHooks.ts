import { useQueryClient } from "@tanstack/react-query";
import { toastSuccess } from "@toast";
import { deleteCookie } from "cookies-next";
import { signOut } from "next-auth/react";

import { OpenAPI } from "@/app/generated";

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
