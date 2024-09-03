"use client";

import { Button } from "@components/ui/button";
import { EventsOrderBy, Order } from "@generated/index";
import { extendArrayToLength } from "@utils/common";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

import { useGetAllEventsWithPagination } from "@/app/hooks/user/eventsHooks";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import EventCard from "../event/components/EventCard";
import EventCarouselSkeleton from "./EventCarouselSkeleton";

const EventCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();

  const { data: events, isLoading } = useGetAllEventsWithPagination({
    page: 1,
    itemsPerPage: 10,
    order: Order.DESC,
    orderBy: EventsOrderBy.EVENT_END_AT,
  });

  if (!events || !events.items.length) {
    return <EventCarouselSkeleton />;
  }

  const data = extendArrayToLength(events.items, 4);

  return isLoading ? (
    <EventCarouselSkeleton />
  ) : (
    <Carousel
      className="flex flex-row items-center space-y-2"
      setApi={setApi}
      opts={{
        align: "start",
        loop: false,
        startIndex: 0,
        breakpoints: {
          "(min-width: 769px)": { loop: false, align: "start" },
        },
      }}
    >
      <Button
        variant="outline"
        className="hidden size-4 rounded-full p-0"
        onClick={() => api?.scrollPrev()}
      >
        <ChevronLeft size={10} />
      </Button>
      <CarouselContent className="ml-0 laptop:-ml-4">
        {data.map((item, index) => (
          <CarouselItem
            key={index}
            className="max-w-xs basis-5/12 laptop:basis-3/12"
          >
            <EventCard item={item} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <Button
        variant="outline"
        className="hidden size-4 rounded-full p-0"
        onClick={() => api?.scrollNext()}
      >
        <ChevronRight size={10} />
      </Button>
      <CarouselPrevious className="top-[2/5] hidden laptop:inline-flex" />
      <CarouselNext className="top-[2/5] hidden laptop:inline-flex" />
    </Carousel>
  );
};

export default EventCarousel;
