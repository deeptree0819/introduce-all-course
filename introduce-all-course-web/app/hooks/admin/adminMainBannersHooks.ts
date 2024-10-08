import {
  AdminCreateMainBannerDto,
  AdminMainBannerDto,
  AdminMainBannersService,
  AdminUpdateMainBannerDto,
  ApiError,
  OpenAPI,
  PaginatedAdminMainBannerSummaryListDto,
} from "@generated/index";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toastApiError, toastSuccess } from "@toast";
import { useRouter } from "next/navigation";

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

  return useQuery<PaginatedAdminMainBannerSummaryListDto, ApiError>({
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
  return useQuery<AdminMainBannerDto, ApiError>({
    queryKey: ["admin", "main", "banners", bannerId],
    queryFn: () => AdminMainBannersService.getMainBannerById(bannerId),
    enabled: !!OpenAPI.TOKEN && !!bannerId,
  });
};

export const useUpdateMainBanner = (bannerId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: AdminUpdateMainBannerDto) =>
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
  const { push } = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: AdminCreateMainBannerDto) =>
      AdminMainBannersService.createMainBanner(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "main", "banners"] });
      toastSuccess("메인배너가 등록되었습니다.");
      push("/admin/main/banners");
    },
    onError: (error: ApiError) => {
      toastApiError(error, "메인배너 등록에 실패했습니다.");
    },
  });
};

export const useDeleteMainBanner = () => {
  const { replace } = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (bannerId: number) =>
      AdminMainBannersService.deleteMainBanner(bannerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "main", "banners"] });
      toastSuccess("메인배너가 삭제되었습니다.");
      replace("/admin/main/banners");
    },
    onError: (error: ApiError) => {
      toastApiError(error, "메인배너 삭제에 실패했습니다.");
    },
  });
};
