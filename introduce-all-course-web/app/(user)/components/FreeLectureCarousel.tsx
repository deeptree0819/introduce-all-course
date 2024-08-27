"use client";

import { Button } from "@components/ui/button";
import { FreeLecturesOrderBy, Order } from "@generated/index";
import { cn, extendArrayToLength } from "@utils/common";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

import { useGetAllFreeLecturesWithPagination } from "@/app/hooks/user/freeLectureHooks";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import FreeLectureCard from "../free-lecture/components/FreeLectureCard";

const FreeLectureCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();

  const { data: freeLectures } = useGetAllFreeLecturesWithPagination({
    page: 1,
    itemsPerPage: 10,
    order: Order.DESC,
    orderBy: FreeLecturesOrderBy.FREE_LECTURE_VIEW_COUNT,
  });

  if (!freeLectures || !freeLectures.items.length) return null;

  const data = extendArrayToLength(freeLectures.items, 4);

  return (
    <Carousel
      className="flex flex-row items-center space-y-2"
      setApi={setApi}
      opts={{
        align: "start",
        loop: false,
        breakpoints: {
          "(min-width: 769px)": { loop: false, align: "start" },
        },
      }}
    >
      <Button
        variant="outline"
        className="hidden h-4 w-4 rounded-full p-0"
        onClick={() => api?.scrollPrev()}
      >
        <ChevronLeft size={10} />
      </Button>
      <CarouselContent className="ml-0 laptop:-ml-4">
        {data.map((item, index) => (
          <CarouselItem
            key={index}
            className={cn("max-w-xs basis-5/12 laptop:basis-3/12")}
          >
            <FreeLectureCard hideOverflowedBadges={true} item={item} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <Button
        variant="outline"
        className="hidden h-4 w-4 rounded-full p-0"
        onClick={() => api?.scrollNext()}
      >
        <ChevronRight size={10} />
      </Button>
      <CarouselPrevious className="top-[2/5] hidden laptop:inline-flex" />
      <CarouselNext className="top-[2/5] hidden laptop:inline-flex" />
    </Carousel>
  );
};

export default FreeLectureCarousel;
