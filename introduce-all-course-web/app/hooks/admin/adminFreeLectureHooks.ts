import {
  AdminCreateFreeLectureDto,
  AdminCreateFreeLectureTagDto,
  AdminFreeLectureResultDto,
  AdminFreeLecturesService,
  AdminFreeLectureTagDto,
  AdminUpdateFreeLectureDto,
  ApiError,
  FreeLecturesOrderBy,
  OpenAPI,
  Order,
  PaginatedAdminFreeLectureSummaryListDto,
  PaginatedAdminFreeLectureTagListDto,
} from "@generated/index";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toastApiError, toastSuccess } from "@toast";
import { useRouter } from "next/navigation";

import { PaginationDto } from "@/app/types/common";

interface GetAllFreeLecturesWithPaginationDto extends PaginationDto {
  queryText?: string;
  order?: Order;
  orderBy?: FreeLecturesOrderBy;
  freeLectureTagId?: string;
}

export const useGetAllFreeLecturesWithPagination = (
  dto: GetAllFreeLecturesWithPaginationDto
) => {
  const { order, orderBy, queryText, freeLectureTagId, page, itemsPerPage } =
    dto;

  return useQuery<PaginatedAdminFreeLectureSummaryListDto, ApiError>({
    queryKey: ["admin", "free-lecture", "posts", dto],
    queryFn: () =>
      AdminFreeLecturesService.getAllFreeLecturesWithPagination(
        order,
        orderBy,
        queryText,
        freeLectureTagId,
        page,
        itemsPerPage
      ),
    enabled: !!OpenAPI.TOKEN,
  });
};

export const useGetFreeLectureById = (postId: number) => {
  return useQuery<AdminFreeLectureResultDto, ApiError>({
    queryKey: ["admin", "free-lecture", "posts", postId],
    queryFn: () => AdminFreeLecturesService.getFreeLectureById(postId),
    enabled: !!OpenAPI.TOKEN && !!postId,
  });
};

export const useUpdateFreeLecture = (postId: number) => {
  const { push } = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: AdminUpdateFreeLectureDto) =>
      AdminFreeLecturesService.updateFreeLecture(postId, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin", "free-lecture", "posts"],
      });
      toastSuccess("게시글이 수정되었습니다.");
      push(`/admin/free-lecture/posts/${postId}`);
    },
    onError: (error: ApiError) => {
      toastApiError(error, "게시글 수정에 실패했습니다.");
    },
  });
};

export const useCreateFreeLecture = () => {
  const { replace } = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: AdminCreateFreeLectureDto) =>
      AdminFreeLecturesService.createFreeLecture(dto),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["admin", "free-lecture", "posts"],
      });
      toastSuccess("게시글이 등록되었습니다.");
      replace(`/admin/free-lecture/posts/${data.free_lecture_id}`);
    },
    onError: (error: ApiError) => {
      toastApiError(error, "게시글 등록에 실패했습니다.");
    },
  });
};

export const useDeleteFreeLecture = () => {
  const { push } = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (postId: number) =>
      AdminFreeLecturesService.deleteFreeLecture(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin", "free-lecture", "posts"],
      });
      toastSuccess("게시글이 삭제되었습니다.");
      push("/admin/free-lecture/posts");
    },
    onError: (error: ApiError) => {
      toastApiError(error, "게시글 삭제에 실패했습니다.");
    },
  });
};

export const useGetAllFreeLectureTagsWithPagination = (dto: PaginationDto) => {
  return useQuery<PaginatedAdminFreeLectureTagListDto, ApiError>({
    queryKey: ["admin", "free-lecture", "tags", dto],
    queryFn: () =>
      AdminFreeLecturesService.getAllFreeLectureTagsWithPagination(
        dto.page,
        dto.itemsPerPage
      ),
    enabled: !!OpenAPI.TOKEN,
  });
};

export const useGetFreeLectureTagById = (freeLectureTagId: number) => {
  return useQuery<AdminFreeLectureTagDto, ApiError>({
    queryKey: ["admin", "free-lecture", "tags", freeLectureTagId],
    queryFn: () =>
      AdminFreeLecturesService.getFreeLectureTagById(freeLectureTagId),
    enabled: !!OpenAPI.TOKEN && !!freeLectureTagId,
  });
};

export const useCreateFreeLectureTag = (onSuccess: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: AdminCreateFreeLectureTagDto) =>
      AdminFreeLecturesService.createFreeLectureTag(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin", "free-lecture", "tags"],
      });
      toastSuccess("무료강의 태그가 등록되었습니다.");
      onSuccess?.();
    },
    onError: (error: ApiError) => {
      toastApiError(error, "무료강의 태그 등록에 실패했습니다.");
    },
  });
};

export const useDeleteFreeLectureTag = (
  freeLectureTagId: number,
  onSuccess?: () => void
) => {
  const { replace } = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () =>
      AdminFreeLecturesService.deleteFreeLectureTag(freeLectureTagId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin", "free-lecture", "tags"],
      });
      toastSuccess("공고분야가 삭제되었습니다.");
      replace("/admin/free-lecture/tags");
      onSuccess?.();
    },
    onError: (error: ApiError) => {
      toastApiError(error, "무료강의 태그 삭제에 실패했습니다.");
    },
  });
};

export const useGetFreeLectureTagPostCount = (freeLectureTagId: number) => {
  return useQuery<number, ApiError>({
    queryKey: ["admin", "free-lecture", "tags", freeLectureTagId, "postcount"],
    queryFn: () =>
      AdminFreeLecturesService.getFreeLectureTagPostCount(freeLectureTagId),
    enabled: !!OpenAPI.TOKEN && !!freeLectureTagId,
  });
};
