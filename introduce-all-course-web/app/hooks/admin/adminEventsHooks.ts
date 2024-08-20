import {
  AdminEventsService,
  ApiError,
  CreateEventDto,
  EventDto,
  EventsOrderBy,
  OpenAPI,
  Order,
  PaginatedeventListDto,
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

  return useQuery<PaginatedeventListDto, ApiError>({
    queryKey: ["admin", "events", dto],
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
  return useQuery<EventDto, ApiError>({
    queryKey: ["admin", "events", eventId],
    queryFn: () => AdminEventsService.getEventById(eventId),
    enabled: !!OpenAPI.TOKEN && !!eventId,
  });
};

export const useUpdateEvent = (eventId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: UpdateEventDto) =>
      AdminEventsService.updateEvent(eventId, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "events"] });
      toastSuccess("게시글이 수정되었습니다.");
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "events"] });
      toastSuccess("게시글이 등록되었습니다.");
      push("/admin/events");
    },
    onError: (error: ApiError) => {
      toastApiError(error, "게시글 등록에 실패했습니다.");
    },
  });
};
