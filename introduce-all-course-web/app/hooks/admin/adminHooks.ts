import { AdminDto, AdminsService, ApiError, OpenAPI } from "@generated/index";
import { useQuery } from "@tanstack/react-query";

export const useAdminFindMe = () => {
  return useQuery<AdminDto, ApiError>({
    queryKey: ["admin", "me"],
    queryFn: () => AdminsService.findMe(),
    enabled: !!OpenAPI.TOKEN,
  });
};
