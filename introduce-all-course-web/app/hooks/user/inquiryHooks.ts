import {
  AdminInquiryService,
  ApiError,
  CreateInquiryFormLinkDto,
  OpenAPI,
  PaginatedInquiryFormLinkListDto,
} from "@generated/index";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toastApiError, toastSuccess } from "@toast";
import { useRouter } from "next/navigation";

import { PaginationDto } from "@/app/types/common";

export const useGetAllInquiryFormLinksWithPagination = (dto: PaginationDto) => {
  const { page, itemsPerPage } = dto;

  return useQuery<PaginatedInquiryFormLinkListDto, ApiError>({
    queryKey: ["admin", "inquiry", "form-links", dto],
    queryFn: () =>
      AdminInquiryService.getAllInquiryFormLinksWithPagination(
        page,
        itemsPerPage
      ),
    enabled: !!OpenAPI.TOKEN,
  });
};

export const useGetLatestInquiryFormLink = () => {
  return useQuery<string, ApiError>({
    queryKey: ["admin", "inquiry", "form-links"],
    queryFn: () => AdminInquiryService.getLatestInquiryFormLink(),
    enabled: !!OpenAPI.TOKEN,
  });
};

export const useCreateInquiryFormLink = (onSuccess?: () => void) => {
  const { push } = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateInquiryFormLinkDto) =>
      AdminInquiryService.createInquiryFormLink(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin", "inquiry", "form-links"],
      });
      toastSuccess("상담신청 링크가 등록되었습니다.");
      push("/admin/inquiry/form-links");
      onSuccess?.();
    },
    onError: (error: ApiError) => {
      toastApiError(error, "상담신청 링크 등록에 실패했습니다.");
    },
  });
};
