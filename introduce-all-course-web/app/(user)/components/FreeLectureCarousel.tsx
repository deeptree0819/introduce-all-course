"use client";

import { Button } from "@components/ui/button";
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

import FreeLectureCarouselImage from "../dummy/freeLectureCarousel.png";
import FreeLectureCard from "../free-lecture/components/FreeLectureCard";

const DUMMY_DATA = [
  {
    id: 0,
    image: FreeLectureCarouselImage,
    title:
      "뉴모노 울트라 마이크로 스코픽 실리코 볼케이노 코니오시스 클라우드 엔지니어가 알아야 할 10가지",
    channel: "실리콘밸리 아저씨들",
    tags: [
      "클라우드",
      "인턴",
      "경진대회",
      "취업",
      "실리콘밸리",
      "아저씨들",
      "코딩",
      "프로그래밍",
    ],
  },
  {
    id: 1,
    image: FreeLectureCarouselImage,
    title: "모르면 승진 안 되는 디자인",
    channel: "삼성생명",
    tags: ["클라우드", "인턴", "경진대회"],
  },
  {
    id: 2,
    image: FreeLectureCarouselImage,
    title: "모르면 승진 안 되는 디자인",
    channel: "삼성생명",
    tags: ["클라우드", "인턴", "경진대회"],
  },
  {
    id: 3,
    image: FreeLectureCarouselImage,
    title: "모르면 승진 안 되는 디자인",
    channel: "삼성생명",
    tags: ["클라우드", "인턴", "경진대회"],
  },
  {
    id: 4,
    image: FreeLectureCarouselImage,
    title: "모르면 승진 안 되는 디자인",
    channel: "삼성생명",
    tags: ["클라우드", "인턴", "경진대회"],
  },
  {
    id: 5,
    image: FreeLectureCarouselImage,
    title: "모르면 승진 안 되는 디자인",
    channel: "삼성생명",
    tags: ["클라우드", "인턴", "경진대회"],
  },
  {
    id: 6,
    image: FreeLectureCarouselImage,
    title: "모르면 승진 안 되는 디자인",
    channel: "삼성생명",
    tags: ["클라우드", "인턴", "경진대회"],
  },
  {
    id: 7,
    image: FreeLectureCarouselImage,
    title: "모르면 승진 안 되는 디자인",
    channel: "삼성생명",
    tags: ["클라우드", "인턴", "경진대회"],
  },
  {
    id: 8,
    image: FreeLectureCarouselImage,
    title: "모르면 승진 안 되는 디자인",
    channel: "삼성생명",
    tags: ["클라우드", "인턴", "경진대회"],
  },
];

const FreeLectureCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();

  return (
    <Carousel
      className="flex flex-row items-center space-y-5"
      setApi={setApi}
      opts={{
        align: "center",
        loop: true,
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
            className="max-w-xs basis-5/12 laptop:basis-3/12"
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
