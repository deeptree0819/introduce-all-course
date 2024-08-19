import {
  AdminMainBannersService,
  ApiError,
  CreateMainBannerDto,
  MainBannerDto,
  OpenAPI,
  PaginatedMainBannerListDto,
  UpdateMainBannerDto,
} from "@generated/index";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toastApiError, toastSuccess } from "@toast";

import { PaginationDto } from "@/app/types/common";

export enum BannerStatus {
  BEFORE = "BEFORE",
  PROGRESS = "PROGRESS",
  AFTER = "AFTER",
}

interface GetAllMainBannesWithPaginationDto extends PaginationDto {
  status?: BannerStatus | undefined;
}

export const useGetAllMainBannersWithPagination = (
  dto: GetAllMainBannesWithPaginationDto
) => {
  const { status, page, itemsPerPage } = dto;

  return useQuery<PaginatedMainBannerListDto, ApiError>({
    queryKey: ["admin", "main", "banners", dto],
    queryFn: () =>
      AdminMainBannersService.getAllMainBannersWithPagination(
        status,
        page,
        itemsPerPage
      ),
    enabled: !!OpenAPI.TOKEN,
  });
};

export const useGetMainBannerById = (bannerId: number) => {
  return useQuery<MainBannerDto, ApiError>({
    queryKey: ["admin", "main", "banners", bannerId],
    queryFn: () => AdminMainBannersService.getMainBannerById(bannerId),
    enabled: !!OpenAPI.TOKEN && !!bannerId,
  });
};

export const useUpdateMainBanner = (bannerId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: UpdateMainBannerDto) =>
      AdminMainBannersService.updateMainBanner(bannerId, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "main", "banners"] });
      toastSuccess("메인배너가 수정되었습니다.");
    },
    onError: (error: ApiError) => {
      toastApiError(error, "메인배너 수정에 실패했습니다.");
    },
  });
};

export const useCreateMainBanner = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateMainBannerDto) =>
      AdminMainBannersService.createMainBanner(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "main", "banners"] });
      toastSuccess("메인배너가 등록되었습니다.");
    },
    onError: (error: ApiError) => {
      toastApiError(error, "메인배너 등록에 실패했습니다.");
    },
  });
};
