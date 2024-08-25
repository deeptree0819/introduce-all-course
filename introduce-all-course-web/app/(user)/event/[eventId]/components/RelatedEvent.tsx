"use client";

import { EventsOrderBy, Order } from "@generated/index";
import { useParams } from "next/navigation";
import { Fragment } from "react";

import {
  useGetAllEventsWithPagination,
  useGetEventById,
} from "@/app/hooks/user/eventsHooks";

import EventCard from "../../components/EventCard";

const RelatedEvent = () => {
  const params = useParams<{ eventId: string }>();
  const eventId = +params.eventId;

  const { data: event } = useGetEventById(eventId);
  const { event_category_id } = event || {};

  const { data: events } = useGetAllEventsWithPagination({
    page: 1,
    itemsPerPage: 4,
    eventCategoryId: event_category_id ? [event_category_id] : [],
    orderBy: EventsOrderBy.EVENT_VIEW_COUNT,
    order: Order.DESC,
  });

  if (!events || !events.items.length) return null;

  return (
    <section className="space-y-4">
      <h3 className="text-base font-semibold">비슷한 공고를 찾아보세요 ☎️</h3>
      <div className="grid w-fit grid-cols-2 gap-5 laptop:grid-cols-3 laptop:gap-7 desktop:grid-cols-4 desktop:gap-10">
        {events.items.map((item) => (
          <Fragment key={item.events_id}>
            <EventCard item={item} key={item.events_id} />
          </Fragment>
        ))}
      </div>
    </section>
  );
};

export default RelatedEvent;
