"use client";

import EditorParagraph from "@components/editor/EditorParagraph";
import { cn } from "@utils/common";
import React, { useEffect,useState } from "react";
import ReactPlayer from "react-player";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import { DUMMY_DESCRIPTION } from "../dummy/dummyContents";

type FreeLectureArticleProps = {
  className?: string;
};

const FreeLectureArticle = ({ className }: FreeLectureArticleProps) => {
  const [hasWindow, setHasWindow] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
  }, []);

  return (
    <article className={cn("space-y-0 laptop:space-y-0", className)}>
      <h1 className="text-lg font-semibold laptop:text-3xl">
        로봇 AI 무료 유튜브 강의 제목입니다.
      </h1>
      <div className="space-x-1.5 pb-3 laptop:space-x-2 laptop:pb-5 laptop:pt-3">
        {["클라우드", "인턴", "경진대회"].map((tag, index) => (
          <Badge
            key={index}
            className="h-fit rounded-sm bg-[#D0E8FF] px-1 text-[10px] font-normal text-[#0029FF] hover:bg-[#D0E8FF] laptop:text-sm"
          >
            {tag}
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
              url="https://www.youtube.com/watch?v=n3_EAnTpqmU"
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
        content={DUMMY_DESCRIPTION}
      />
    </article>
  );
};

export default FreeLectureArticle;
