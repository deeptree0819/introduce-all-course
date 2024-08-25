"use client";

import EditorParagraph from "@components/editor/EditorParagraph";
import Overlay from "@components/modal/Overlay";
import Badge from "@components/ui/Badge";
import { DateFnsFormat, getDdayString, getUtcToDateFormat } from "@utils/date";
import { ExpandIcon } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { useGetEventById } from "@/app/hooks/user/eventsHooks";
import useWindowSize from "@/app/hooks/windowSizeHooks";
import { Separator } from "@/components/ui/separator";

const EventArticle = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  const param = useParams<{ eventId: string }>();
  const eventId = +param.eventId;

  const { data: event } = useGetEventById(eventId);

  const { width: windowWidth, height: windowHeight } = useWindowSize();

  useEffect(() => {
    if (!event?.event_poster_image_url) return;

    const img = new window.Image();

    img.src = event.event_poster_image_url;

    img.onload = () => {
      const imageWidth = img.width;
      const imageHeight = img.height;
      const imageRatio = imageWidth / imageHeight;

      const maxWidth = windowWidth * 0.9;
      const maxHeight = windowHeight * 0.9;

      if (maxWidth / imageRatio < maxHeight) {
        setImageSize({ width: maxWidth, height: maxWidth / imageRatio });
      } else {
        setImageSize({ width: maxHeight * imageRatio, height: maxHeight });
      }
    };
  }, [windowWidth, windowHeight, event?.event_poster_image_url]);

  if (!event) return null;

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
              src={event.event_poster_image_url}
              alt={event.event_title}
              className="w-full"
              width={1000}
              height={1000}
            />
          </div>
          <div className="order-2 mt-6 w-fit space-x-1.5 laptop:order-1 laptop:col-span-2 laptop:mt-2 laptop:space-x-3">
            <Badge className="laptop:rounded-xl laptop:px-4 laptop:py-1 laptop:text-sm">
              {getDdayString(event.event_end_at)}
            </Badge>
            <Badge className="laptop:rounded-xl laptop:px-3 laptop:py-1 laptop:text-sm">
              {event.event_category_name}
            </Badge>
          </div>
          <div className="order-3 mt-2.5 space-y-1.5 laptop:order-2 laptop:col-span-2 laptop:mb-6">
            <h1 className="break-keep text-lg font-semibold laptop:text-3xl">
              {event.event_title}
            </h1>
            <p className="text-base text-slate-600 laptop:text-xl">
              {`${getUtcToDateFormat(
                event.event_start_at,
                DateFnsFormat.YYYYMMDD_KR
              )} ~ ${getUtcToDateFormat(
                event.event_end_at,
                DateFnsFormat.YYYYMMDD_KR
              )}`}
            </p>
          </div>
          <EditorParagraph
            content={JSON.parse(event.event_info)}
            className="order-4 mt-4 pb-2 laptop:ml-10"
          />
        </header>
        <Separator />
        <section>
          {event.event_description && (
            <>
              <EditorParagraph
                className="pb-6"
                content={JSON.parse(event.event_description)}
              />
              <Separator className="my-3" />
            </>
          )}
          <div className="flex flex-row gap-2 text-xs">
            <div className="font-semibold">첨부파일</div>
            <div className="flex flex-col gap-1">
              {!!event.event_attachment_urls.length ? (
                event.event_attachment_urls.map((url, index) => (
                  <a
                    href={url}
                    target="_blank"
                    download
                    key={index}
                    className="w-full max-w-[150px] truncate"
                  >
                    {decodeURIComponent(url.split("__")[1])}
                  </a>
                ))
              ) : (
                <span>첨부파일이 없습니다.</span>
              )}
            </div>
          </div>
        </section>
      </article>
      {isExpanded && (
        <Overlay onClose={() => setIsExpanded(false)}>
          <Image
            width={imageSize.width}
            height={imageSize.height}
            src={event.event_poster_image_url}
            alt={event.event_title}
          />
        </Overlay>
      )}
    </>
  );
};

export default EventArticle;
