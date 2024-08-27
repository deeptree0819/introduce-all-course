"use client";

import Pagination from "@components/ui/Pagination";
import { EventsOrderBy, Order } from "@generated/index";
import {
  useDeleteQueryParams,
  useGetSearchParams,
  useUpdateQueryParams,
} from "@utils/common";
import { useRouter } from "next/navigation";
import { Fragment } from "react";

import { useGetAllEventsWithPagination } from "@/app/hooks/user/eventsHooks";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import EventCard from "./EventCard";

const EventList = () => {
  const { eventCategoryIds, order, page } = useGetSearchParams();

  const orderDirection = order === "oldest" ? Order.ASC : Order.DESC;
  const orderBy =
    order === "due"
      ? EventsOrderBy.EVENT_END_AT
      : order === "viewCount"
      ? EventsOrderBy.EVENT_VIEW_COUNT
      : EventsOrderBy.CREATED_AT;

  const { data: events } = useGetAllEventsWithPagination({
    eventCategoryId:
      !!eventCategoryIds && !!eventCategoryIds.length
        ? eventCategoryIds.split(",").map(Number)
        : [],
    order: orderDirection,
    orderBy,
    page: page ? +page : 1,
    itemsPerPage: 24,
  });

  const updateQueryParams = useUpdateQueryParams();
  const deleteQueryParams = useDeleteQueryParams();
  const { replace } = useRouter();

  const handleOnValueChange = (value: string) => {
    const newUrl = value
      ? updateQueryParams({ order: value })
      : deleteQueryParams(["order"]);

    if (newUrl !== window.location.href) {
      replace(newUrl);
    }
  };

  return (
    <div className="w-full space-y-20 py-3 laptop:py-10">
      <div className="flex flex-col space-y-3 laptop:space-y-5">
        <ToggleGroup
          type="single"
          className="block space-x-1 self-end"
          onValueChange={handleOnValueChange}
        >
          <ToggleGroupItem value="viewCount" size="sm">
            인기순
          </ToggleGroupItem>
          <ToggleGroupItem value="latest" size="sm">
            최신순
          </ToggleGroupItem>
          <ToggleGroupItem value="due" size="sm">
            마감임박순
          </ToggleGroupItem>
        </ToggleGroup>

        {!!events && !!events.items.length ? (
          <div className="grid w-fit grid-cols-2 gap-5 laptop:grid-cols-3 laptop:gap-7 desktop:grid-cols-4 desktop:gap-10">
            {events.items.map((event) => (
              <Fragment key={event.events_id}>
                <EventCard item={event} key={event.events_id} />
              </Fragment>
            ))}
          </div>
        ) : (
          <div className="h-10 w-full text-center">
            게시글이 존재하지 않습니다.
          </div>
        )}
      </div>

      {!!events && !!events.pagination.totalItemCount && (
        <Pagination
          currentPage={+events.pagination.currentPage.toString()}
          totalPage={+events.pagination.totalPage.toString()}
        />
      )}
    </div>
  );
};

export default EventList;
