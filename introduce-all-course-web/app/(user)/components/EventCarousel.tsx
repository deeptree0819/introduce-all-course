"use client";

import { Button } from "@components/ui/button";
import { cn } from "@utils/common";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import EventCarouselImage from "../dummy/eventCarousel.png";
import EventCard from "../event/components/EventCard";

const DUMMY_DATA = [
  {
    id: 0,
    image: EventCarouselImage,
    title: "1111111111111111111111111111111111111111111111111111111",
    organization: "삼성생명",
    dday: "D-3",
  },
  {
    id: 1,
    image: EventCarouselImage,
    title: "클라우드 데이터 엔지니어 양성과정",
    organization: "삼성생명",
    dday: "D-3",
  },
  {
    id: 2,
    image: EventCarouselImage,
    title: "클라우드 데이터 엔지니어 양성과정",
    organization: "삼성생명",
    dday: "D-3",
  },
  {
    id: 3,
    image: EventCarouselImage,
    title: "클라우드 데이터 엔지니어 양성과정",
    organization: "삼성생명",
    dday: "D-3",
  },
  {
    id: 4,
    image: EventCarouselImage,
    title: "클라우드 데이터 엔지니어 양성과정",
    organization: "삼성생명",
    dday: "D-3",
  },
  {
    id: 5,
    image: EventCarouselImage,
    title: "클라우드 데이터 엔지니어 양성과정",
    organization: "삼성생명",
    dday: "D-3",
  },
  {
    id: 6,
    image: EventCarouselImage,
    title: "클라우드 데이터 엔지니어 양성과정",
    organization: "삼성생명",
    dday: "D-3",
  },
  {
    id: 7,
    image: EventCarouselImage,
    title: "클라우드 데이터 엔지니어 양성과정",
    organization: "삼성생명",
    dday: "D-3",
  },
  {
    id: 8,
    image: EventCarouselImage,
    title: "클라우드 데이터 엔지니어 양성과정",
    organization: "삼성생명",
    dday: "D-3",
  },
  {
    id: 9,
    image: EventCarouselImage,
    title: "클라우드 데이터 엔지니어 양성과정",
    organization: "삼성생명",
    dday: "D-3",
  },
];

const EventCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();

  return (
    <Carousel
      className="flex flex-row items-center space-y-5"
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
        className="hidden h-4 w-4 rounded-full p-0"
        onClick={() => api?.scrollPrev()}
      >
        <ChevronLeft size={10} />
      </Button>
      <CarouselContent>
        {DUMMY_DATA.map((item, index) => (
          <CarouselItem
            key={index}
            className={cn(
              "max-w-xs basis-5/12 laptop:basis-3/12",
              index == 0 && "ml-4 laptop:ml-0"
            )}
          >
            <EventCard item={item} />
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

export default EventCarousel;
