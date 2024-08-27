"use client";

import EditorParagraph from "@components/editor/EditorParagraph";
import { cn } from "@utils/common";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

import { useGetFreeLectureById } from "@/app/hooks/user/freeLectureHooks";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

type FreeLectureArticleProps = {
  className?: string;
};

const FreeLectureArticle = ({ className }: FreeLectureArticleProps) => {
  const [hasWindow, setHasWindow] = useState(false);

  const param = useParams<{ freeLectureId: string }>();
  const freeLectureId = +param.freeLectureId;

  const { data: freeLecture } = useGetFreeLectureById(freeLectureId);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
  }, []);

  if (!freeLecture) return null;

  return (
    <article className={cn("space-y-0 laptop:space-y-0", className)}>
      <h1 className="text-lg font-semibold laptop:text-3xl">
        {freeLecture.free_lecture_title}
      </h1>
      <div className="space-x-1.5 pb-3 laptop:space-x-2 laptop:pb-5 laptop:pt-3">
        {freeLecture.free_lecture_tags.map((tag, index) => (
          <Badge
            key={index}
            className="h-fit rounded-sm bg-[#D0E8FF] px-1 text-[10px] font-normal text-[#0029FF] hover:bg-[#D0E8FF] laptop:text-sm"
          >
            {tag.free_lecture_tag_name}
          </Badge>
        ))}
      </div>
      <div className="pb-2 laptop:pb-5 ">
        <div className="relative pt-[56.25%]">
          {hasWindow && (
            <ReactPlayer
              width="100%"
              height="100%"
              controls={true}
              url={freeLecture.free_lecture_url}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
              }}
            />
          )}
        </div>
      </div>
      <Separator />
      <EditorParagraph
        className="pt-2 laptop:pt-5"
        content={freeLecture.free_lecture_description}
      />
    </article>
  );
};

export default FreeLectureArticle;
