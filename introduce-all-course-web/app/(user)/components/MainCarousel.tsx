"use client";

import { Button } from "@components/ui/button";
import { extendArrayToLength } from "@utils/common";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useGetAllMainBanners } from "@/app/hooks/user/mainBannersHooks";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import MainCarouselSkeleton from "./MainCarouselSkeleton";

const MainCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const { data: mainBanners, isLoading } = useGetAllMainBanners();

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

  if (!mainBanners || !mainBanners.length) {
    return <MainCarouselSkeleton />;
  }

  const data = extendArrayToLength(mainBanners, 5);

  return isLoading ? (
    <MainCarouselSkeleton />
  ) : (
    <Carousel
      className="flex flex-col items-center space-y-5"
      setApi={setApi}
      opts={{ loop: true }}
    >
      <CarouselContent>
        {data.map((item, index) => (
          <CarouselItem
            key={index}
            className="max-w-xl basis-10/12 laptop:basis-6/12"
          >
            <div className="overflow-hidden rounded-2xl border border-slate-200 laptop:rounded-3xl">
              <Link href={item.main_banner_url}>
                <Image
                  src={item.main_banner_image_url}
                  alt={item.main_banner_image_name}
                  className="aspect-video w-full rounded-2xl transition-transform duration-500 hover:scale-105 laptop:rounded-3xl"
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
