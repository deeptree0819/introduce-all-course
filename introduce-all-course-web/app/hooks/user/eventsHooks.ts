import {
  ApiError,
  EventResultDto,
  EventsOrderBy,
  EventsService,
  Order,
  PaginatedEventCategoryListDto,
  PaginatedEventListDto,
} from "@generated/index";
import { useQuery } from "@tanstack/react-query";

import { PaginationDto } from "@/app/types/common";

interface GetAllEventsWithPaginationDto extends PaginationDto {
  order?: Order;
  orderBy?: EventsOrderBy;
  eventCategoryId?: Array<number>;
  excludeEventId?: number;
}

export const useGetAllEventsWithPagination = (
  dto: GetAllEventsWithPaginationDto
) => {
  const {
    order,
    orderBy,
    eventCategoryId,
    excludeEventId,
    page,
    itemsPerPage,
  } = dto;

  return useQuery<PaginatedEventListDto, ApiError>({
    queryKey: ["user", "events", "posts", dto],
    queryFn: () =>
      EventsService.getAllEventsWithPagination(
        order,
        orderBy,
        eventCategoryId,
        excludeEventId,
        page,
        itemsPerPage
      ),
  });
};

export const useGetEventById = (eventId: number) => {
  return useQuery<EventResultDto, ApiError>({
    queryKey: ["user", "events", "posts", eventId],
    queryFn: () => EventsService.getEventById(eventId),
  });
};

export const useGetAllEventCategoriesWithPagination = (dto: PaginationDto) => {
  return useQuery<PaginatedEventCategoryListDto, ApiError>({
    queryKey: ["user", "events", "categories", dto],
    queryFn: () =>
      EventsService.getAllEventCategoriesWithPagination(
        dto.page,
        dto.itemsPerPage
      ),
  });
};
