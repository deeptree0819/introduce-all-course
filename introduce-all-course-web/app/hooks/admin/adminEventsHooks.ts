import {
  AdminEventsService,
  ApiError,
  CreateEventCategoryDto,
  CreateEventDto,
  EventCategoryDto,
  EventResultDto,
  EventsOrderBy,
  OpenAPI,
  Order,
  PaginatedEventCategoryListDto,
  PaginatedEventListDto,
  UpdateEventDto,
} from "@generated/index";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toastApiError, toastSuccess } from "@toast";
import { useRouter } from "next/navigation";

import { PaginationDto } from "@/app/types/common";

interface GetAllEventsWithPaginationDto extends PaginationDto {
  queryText?: string;
  order?: Order;
  orderBy?: EventsOrderBy;
}

export const useGetAllEventsWithPagination = (
  dto: GetAllEventsWithPaginationDto
) => {
  const { queryText, order, orderBy, page, itemsPerPage } = dto;

  return useQuery<PaginatedEventListDto, ApiError>({
    queryKey: ["admin", "events", "posts", dto],
    queryFn: () =>
      AdminEventsService.getAllEventsWithPagination(
        order,
        orderBy,
        queryText,
        page,
        itemsPerPage
      ),
    enabled: !!OpenAPI.TOKEN,
  });
};

export const useGetEventById = (eventId: number) => {
  return useQuery<EventResultDto, ApiError>({
    queryKey: ["admin", "events", "posts", eventId],
    queryFn: () => AdminEventsService.getEventById(eventId),
    enabled: !!OpenAPI.TOKEN && !!eventId,
  });
};

export const useUpdateEvent = (eventId: number) => {
  const { push } = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: UpdateEventDto) =>
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
  const { push } = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateEventDto) => AdminEventsService.createEvent(dto),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["admin", "events", "posts"] });
      toastSuccess("게시글이 등록되었습니다.");
      push(`/admin/events/posts/${data.events_id}`);
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
  return useQuery<PaginatedEventCategoryListDto, ApiError>({
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
  return useQuery<EventCategoryDto, ApiError>({
    queryKey: ["admin", "events", "categories", categoryId],
    queryFn: () => AdminEventsService.getEventCategoryById(categoryId),
    enabled: !!OpenAPI.TOKEN && !!categoryId,
  });
};

export const useCreateEventCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateEventCategoryDto) =>
      AdminEventsService.createEventCategory(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin", "events", "categories"],
      });
      toastSuccess("공고분야가 등록되었습니다.");
    },
    onError: (error: ApiError) => {
      toastApiError(error, "공고분야 등록에 실패했습니다.");
    },
  });
};

export const useDeleteEventCategory = () => {
  const { push } = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (categoryId: number) =>
      AdminEventsService.deleteEventCategory(categoryId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin", "events", "categories"],
      });
      toastSuccess("공고분야가 삭제되었습니다.");
      push("/admin/events/categories");
    },
    onError: (error: ApiError) => {
      toastApiError(error, "공고분야 삭제에 실패했습니다.");
    },
  });
};
