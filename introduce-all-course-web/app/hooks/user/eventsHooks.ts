import {
  ApiError,
  EventResultDto,
  EventsOrderBy,
  EventsService,
  Order,
  PaginatedEventCategoryListDto,
  PaginatedEventListDto,
} from "@generated/index";
import { useMutation, useQuery } from "@tanstack/react-query";

import useViewStore from "@/app/stores/viewStore";
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
    enabled: !!eventId,
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

export const useIncreaseEventViewCount = () => {
  const getView = useViewStore((state) => state.getView);
  const setView = useViewStore((state) => state.setView);

  return useMutation<number, ApiError, number>({
    mutationFn: (eventId) => {
      const lastViewed = getView(eventId.toString());
      const currentTime = Date.now();

      if (!lastViewed || currentTime - lastViewed > 600000) {
        console.log("setView", eventId.toString(), currentTime);

        setView(eventId.toString(), currentTime);
        return EventsService.increaseEventViewCount(eventId);
      }

      return Promise.resolve(0);
    },
  });
};
