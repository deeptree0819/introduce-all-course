"use client";

import { Fragment } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import Image1 from "../dummy/event1.png";
import Image2 from "../dummy/event2.png";
import Image3 from "../dummy/event3.png";
import Image4 from "../dummy/event4.png";
import EventCard from "./EventCard";

const DUMMY = [
  {
    id: 0,
    image: Image1,
    title:
      "뉴모노 울트라 마이크로 스코픽 실리코 볼케이노 코니오시스 클라우드 엔지니어 양성 과정",
    organization: "삼성생명",
    dday: "D-3",
  },
  {
    id: 1,
    image: Image2,
    title: "클라우드 데이터 엔지니어 양성과정",
    organization: "삼성생명",
    dday: "D-3",
  },
  {
    id: 2,
    image: Image3,
    title: "클라우드 데이터 엔지니어 양성과정",
    organization: "삼성생명",
    dday: "D-3",
  },
  {
    id: 3,
    image: Image4,
    title: "클라우드 데이터 엔지니어 양성과정",
    organization: "삼성생명",
    dday: "D-3",
  },
  {
    id: 4,
    image: Image1,
    title: "클라우드 데이터 엔지니어 양성과정",
    organization: "삼성생명",
    dday: "D-3",
  },
  {
    id: 5,
    image: Image2,
    title: "클라우드 데이터 엔지니어 양성과정",
    organization: "삼성생명",
    dday: "D-3",
  },
  {
    id: 6,
    image: Image3,
    title: "클라우드 데이터 엔지니어 양성과정",
    organization: "삼성생명",
    dday: "D-3",
  },
  {
    id: 7,
    image: Image4,
    title: "클라우드 데이터 엔지니어 양성과정",
    organization: "삼성생명",
    dday: "D-3",
  },
  {
    id: 8,
    image: Image1,
    title: "클라우드 데이터 엔지니어 양성과정",
    organization: "삼성생명",
    dday: "D-3",
  },
  {
    id: 9,
    image: Image2,
    title: "클라우드 데이터 엔지니어 양성과정",
    organization: "삼성생명",
    dday: "D-3",
  },
];

type EventListProps = {
  temp?: string;
};

const EventList = ({}: EventListProps) => {
  return (
    <div className="w-full space-y-20 py-3 laptop:w-fit laptop:py-10">
      <div className="flex flex-col space-y-3 laptop:space-y-5">
        <ToggleGroup type="single" className="block space-x-1 self-end">
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

        <div className="grid w-fit grid-cols-2 gap-5 laptop:grid-cols-3 laptop:gap-7 desktop:grid-cols-4 desktop:gap-10">
          {DUMMY.map((item) => (
            <Fragment key={item.id}>
              <EventCard item={item} key={item.id} />
            </Fragment>
          ))}
        </div>
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default EventList;
