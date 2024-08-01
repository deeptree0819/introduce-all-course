"use client";

import { Button } from "@components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import MainCarouselImage from "../dummy/mainCarousel.png";

const DUMMY_DATA = [
  {
    image: MainCarouselImage,
    url: "/event/1",
    imageName: "코드잇 스프린트 프론트엔드 엔지니어 트랙",
  },
  {
    image: MainCarouselImage,
    url: "/event/2",
    imageName: "코드잇 스프린트 프론트엔드 엔지니어 트랙",
  },
  {
    image: MainCarouselImage,
    url: "/event/3",
    imageName: "코드잇 스프린트 프론트엔드 엔지니어 트랙",
  },
  {
    image: MainCarouselImage,
    url: "/event/4",
    imageName: "코드잇 스프린트 프론트엔드 엔지니어 트랙",
  },
  {
    image: MainCarouselImage,
    url: "/event/5",
    imageName: "코드잇 스프린트 프론트엔드 엔지니어 트랙",
  },
  {
    image: MainCarouselImage,
    url: "/event/6",
    imageName: "코드잇 스프린트 프론트엔드 엔지니어 트랙",
  },
  {
    image: MainCarouselImage,
    url: "/event/7",
    imageName: "코드잇 스프린트 프론트엔드 엔지니어 트랙",
  },
  {
    image: MainCarouselImage,
    url: "/event/8",
    imageName: "코드잇 스프린트 프론트엔드 엔지니어 트랙",
  },
  {
    image: MainCarouselImage,
    url: "/event/9",
    imageName: "코드잇 스프린트 프론트엔드 엔지니어 트랙",
  },
  {
    image: MainCarouselImage,
    url: "/event/10",
    imageName: "코드잇 스프린트 프론트엔드 엔지니어 트랙",
  },
];

const MainCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <Carousel
      className="flex flex-col items-center space-y-5"
      setApi={setApi}
      opts={{ loop: true }}
    >
      <CarouselContent>
        {DUMMY_DATA.map((item, index) => (
          <CarouselItem
            key={index}
            className="max-w-xl basis-10/12 laptop:basis-6/12"
          >
            <div className="overflow-hidden rounded-2xl border border-slate-200 laptop:rounded-3xl">
              <Link href={item.url}>
                <Image
                  src={item.image}
                  alt={item.imageName}
                  className="aspect-video w-full rounded-2xl transition-transform duration-500 hover:scale-105"
                  width={500}
                  height={281.25}
                />
              </Link>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex flex-row items-center space-x-3 laptop:space-x-14">
        <Button
          variant="outline"
          className="h-4 w-4 rounded-full p-0 laptop:h-7 laptop:w-7 laptop:border-2"
          onClick={() => api?.scrollPrev()}
        >
          <ChevronLeft size={30} className="w-2.5 laptop:w-4" />
        </Button>
        <div className="text-xs laptop:text-lg">
          {current} / {count}
        </div>
        <Button
          variant="outline"
          className="h-4 w-4 rounded-full p-0 laptop:h-7 laptop:w-7 laptop:border-2"
          onClick={() => api?.scrollNext()}
        >
          <ChevronRight size={30} className="w-2.5 laptop:w-4" />
        </Button>
      </div>
    </Carousel>
  );
};

export default MainCarousel;
