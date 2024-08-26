import {
  ApiError,
  FreeLectureResultDto,
  FreeLecturesOrderBy,
  FreeLecturesService,
  OpenAPI,
  Order,
  PaginatedFreeLectureSummaryListDto,
  PaginatedFreeLectureTagListDto,
} from "@generated/index";
import { useQuery } from "@tanstack/react-query";

import { PaginationDto } from "@/app/types/common";

interface GetAllFreeLecturesWithPaginationDto extends PaginationDto {
  queryText?: string;
  order?: Order;
  orderBy?: FreeLecturesOrderBy;
  freeLectureTagIds?: Array<number>;
}

export const useGetAllFreeLecturesWithPagination = (
  dto: GetAllFreeLecturesWithPaginationDto
) => {
  const { order, orderBy, freeLectureTagIds, page, itemsPerPage } = dto;

  return useQuery<PaginatedFreeLectureSummaryListDto, ApiError>({
    queryKey: ["user", "free-lecture", "posts", dto],
    queryFn: () =>
      FreeLecturesService.getAllFreeLecturesWithPagination(
        order,
        orderBy,
        freeLectureTagIds,
        page,
        itemsPerPage
      ),
    enabled: !!OpenAPI.TOKEN,
  });
};

export const useGetFreeLectureById = (postId: number) => {
  return useQuery<FreeLectureResultDto, ApiError>({
    queryKey: ["user", "free-lecture", "posts", postId],
    queryFn: () => FreeLecturesService.getFreeLectureById(postId),
    enabled: !!OpenAPI.TOKEN && !!postId,
  });
};

export const useGetAllFreeLectureTagsWithPagination = (dto: PaginationDto) => {
  return useQuery<PaginatedFreeLectureTagListDto, ApiError>({
    queryKey: ["user", "free-lecture", "tags", dto],
    queryFn: () =>
      FreeLecturesService.getAllFreeLectureTagsWithPagination(
        dto.page,
        dto.itemsPerPage
      ),
    enabled: !!OpenAPI.TOKEN,
  });
};
