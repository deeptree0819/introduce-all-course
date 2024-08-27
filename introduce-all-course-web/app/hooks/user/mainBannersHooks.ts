import { ApiError, MainBannerDto, MainBannersService } from "@generated/index";
import { useQuery } from "@tanstack/react-query";

export const useGetAllMainBanners = () => {
  return useQuery<MainBannerDto[], ApiError>({
    queryKey: ["user", "main", "banners"],
    queryFn: () => MainBannersService.getAllMainBanners(),
  });
};
