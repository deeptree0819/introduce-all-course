"use client";

import EditorParagraph from "@components/editor/EditorParagraph";
import Overlay from "@components/modal/Overlay";
import Badge from "@components/ui/Badge";
import { ExpandIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import useWindowSize from "@/app/hooks/useWindowSize";
import { Separator } from "@/components/ui/separator";

import { DUMMY_DESCRIPTION, DUMMY_INFORMATION } from "../dummy/dummyContents";
import EventPosterImage from "../dummy/event-poster.png";

const EventArticle = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  const { width: windowWidth, height: windowHeight } = useWindowSize();
  const { width: imageWidth, height: imageHeight } = EventPosterImage;

  useEffect(() => {
    const imageRatio = imageWidth / imageHeight;

    const maxWidth = windowWidth * 0.9;
    const maxHeight = windowHeight * 0.9;

    if (maxWidth / imageRatio < maxHeight) {
      setImageSize({ width: maxWidth, height: maxWidth / imageRatio });
    } else {
      setImageSize({ width: maxHeight * imageRatio, height: maxHeight });
    }
  }, [windowWidth, windowHeight, imageWidth, imageHeight]);

  return (
    <>
      <article className="space-y-6">
        <header className="flex flex-col items-start laptop:grid laptop:grid-cols-[minmax(0,450px)_minmax(250px,1fr)] laptop:items-start laptop:justify-center">
          <div
            className="group relative order-1 w-full max-w-[450px] laptop:order-3 laptop:w-auto"
            onClick={() => setIsExpanded(true)}
          >
            <div className="absolute right-3 top-3 rounded bg-white/60 p-1 opacity-100 group-hover:opacity-100 laptop:opacity-0">
              <ExpandIcon size={24} className="text-slate-500" />
            </div>
            <Image
              src={EventPosterImage}
              alt="[이지엔] eZ한 숏폼 공모전 (~7/31) | 2024년 이지에디터 6기"
              className="w-full"
            />
          </div>
          <div className="order-2 mt-6 w-fit space-x-1.5 laptop:order-1 laptop:col-span-2 laptop:mt-2 laptop:space-x-3">
            <Badge className="laptop:rounded-xl laptop:px-4 laptop:py-1 laptop:text-sm">
              D-2
            </Badge>
            <Badge className="laptop:rounded-xl laptop:px-3 laptop:py-1 laptop:text-sm">
              공모전
            </Badge>
          </div>
          <div className="order-3 mt-2.5 space-y-1.5 laptop:order-2 laptop:col-span-2 laptop:mb-6">
            <h1 className="break-keep text-lg font-semibold laptop:text-3xl">
              [이지엔] eZ한 숏폼 공모전 (~7/31) | 2024년 이지에디터 6기
            </h1>
            <p className="text-base text-slate-600 laptop:text-xl">
              2024년 07월 01일 ~ 2024년 09월 18일
            </p>
          </div>
          <EditorParagraph
            content={DUMMY_INFORMATION}
            className="order-4 mt-4 pb-2 laptop:ml-10"
          />
        </header>
        <Separator />
        <section>
          <EditorParagraph className="pb-6" content={DUMMY_DESCRIPTION} />
          <Separator className="my-3" />
          <div className="flex flex-row gap-2 text-xs">
            <div className="font-semibold">첨부파일</div>
            <div className="flex flex-col gap-1">
              <span>첨부파일.docs</span>
              <span>첨부파일.docs</span>
              <span>첨부파일.docs</span>
            </div>
          </div>
        </section>
      </article>
      {isExpanded && (
        <Overlay onClose={() => setIsExpanded(false)}>
          <Image
            width={imageSize.width}
            height={imageSize.height}
            src={EventPosterImage}
            alt="[이지엔] eZ한 숏폼 공모전 (~7/31) | 2024년 이지에디터 6기"
          />
        </Overlay>
      )}
    </>
  );
};

export default EventArticle;
