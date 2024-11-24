import {
  AdminCreateEventCategoryDto,
  AdminCreateEventDto,
  AdminDeleteEventCategoryDto,
  AdminEventCategoryDto,
  AdminEventResultDto,
  AdminEventsService,
  AdminUpdateEventDto,
  ApiError,
  EventsOrderBy,
  OpenAPI,
  Order,
  PaginatedAdminEventCategoryListDto,
  PaginatedAdminEventSummaryListDto,
} from "@generated/index";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toastApiError, toastSuccess } from "@toast";
import { useRouter } from "next/navigation";

import { PaginationDto } from "@/app/types/common";

interface GetAllEventsWithPaginationDto extends PaginationDto {
  queryText?: string;
  order?: Order;
  orderBy?: EventsOrderBy;
  eventCategoryId?: string;
}

export const useGetAllEventsWithPagination = (
  dto: GetAllEventsWithPaginationDto
) => {
  const { order, orderBy, queryText, eventCategoryId, page, itemsPerPage } =
    dto;

  return useQuery<PaginatedAdminEventSummaryListDto, ApiError>({
    queryKey: ["admin", "events", "posts", dto],
    queryFn: () =>
      AdminEventsService.getAllEventsWithPagination(
        order,
        orderBy,
        queryText,
        eventCategoryId,
        page,
        itemsPerPage
      ),
    enabled: !!OpenAPI.TOKEN,
  });
};

export const useGetEventById = (eventId: number) => {
  return useQuery<AdminEventResultDto, ApiError>({
    queryKey: ["admin", "events", "posts", eventId],
    queryFn: () => AdminEventsService.getEventById(eventId),
    enabled: !!OpenAPI.TOKEN && !!eventId,
  });
};

export const useUpdateEvent = (eventId: number) => {
  const { push } = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: AdminUpdateEventDto) =>
      AdminEventsService.updateEvent(eventId, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "events", "posts"] });
      toastSuccess("게시글이 수정되었습니다.");
      push(`/admin/events/posts/${eventId}`);
    },
    onError: (error: ApiError) => {
      toastApiError(error, "게시글 수정에 실패했습니다.");
    },
  });
};

export const useCreateEvent = () => {
  const { replace } = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: AdminCreateEventDto) =>
      AdminEventsService.createEvent(dto),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["admin", "events", "posts"] });
      toastSuccess("게시글이 등록되었습니다.");
      replace(`/admin/events/posts/${data.events_id}`);
    },
    onError: (error: ApiError) => {
      toastApiError(error, "게시글 등록에 실패했습니다.");
    },
  });
};

export const useDeleteEvent = () => {
  const { push } = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (eventId: number) => AdminEventsService.deleteEvent(eventId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "events", "posts"] });
      toastSuccess("게시글이 삭제되었습니다.");
      push("/admin/events/posts");
    },
    onError: (error: ApiError) => {
      toastApiError(error, "게시글 삭제에 실패했습니다.");
    },
  });
};

export const useGetAllEventCategoriesWithPagination = (dto: PaginationDto) => {
  return useQuery<PaginatedAdminEventCategoryListDto, ApiError>({
    queryKey: ["admin", "events", "categories", dto],
    queryFn: () =>
      AdminEventsService.getAllEventCategoriesWithPagination(
        dto.page,
        dto.itemsPerPage
      ),
    enabled: !!OpenAPI.TOKEN,
  });
};

export const useGetEventCategoryById = (categoryId: number) => {
  return useQuery<AdminEventCategoryDto, ApiError>({
    queryKey: ["admin", "events", "categories", categoryId],
    queryFn: () => AdminEventsService.getEventCategoryById(categoryId),
    enabled: !!OpenAPI.TOKEN && !!categoryId,
  });
};

export const useCreateEventCategory = (onSuccess: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: AdminCreateEventCategoryDto) =>
      AdminEventsService.createEventCategory(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin", "events", "categories"],
      });
      toastSuccess("커리큘럼가 등록되었습니다.");
      onSuccess?.();
    },
    onError: (error: ApiError) => {
      toastApiError(error, "커리큘럼 등록에 실패했습니다.");
    },
  });
};

export const useDeleteEventCategory = (
  categoryId: number,
  onSuccess?: () => void
) => {
  const { replace } = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: AdminDeleteEventCategoryDto) =>
      AdminEventsService.deleteEventCategory(categoryId, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin", "events", "categories"],
      });
      toastSuccess("커리큘럼가 삭제되었습니다.");
      replace("/admin/events/categories");
      onSuccess?.();
    },
    onError: (error: ApiError) => {
      toastApiError(error, "커리큘럼 삭제에 실패했습니다.");
    },
  });
};

export const useGetEventCategoryPostCount = (categoryId: number) => {
  return useQuery<number, ApiError>({
    queryKey: ["admin", "events", "categories", categoryId, "postcount"],
    queryFn: () => AdminEventsService.getEventCategoryPostCount(categoryId),
    enabled: !!OpenAPI.TOKEN && !!categoryId,
  });
};
