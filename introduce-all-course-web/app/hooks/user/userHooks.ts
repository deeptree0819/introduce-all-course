import { ApiError, AuthService, OpenAPI, UserDto } from "@generated/index";
import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";

export const useFindMe = () => {
  OpenAPI.TOKEN = getCookie("user.token");

  return useQuery<UserDto, ApiError>({
    queryKey: ["user", "me"],
    queryFn: () => AuthService.findMe(),
    enabled: !!OpenAPI.TOKEN,
  });
};
