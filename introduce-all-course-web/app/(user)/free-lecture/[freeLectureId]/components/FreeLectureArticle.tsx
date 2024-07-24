"use client";

import EditorParagraph from "@components/editor/EditorParagraph";
import { cn } from "@utils/common";
import ReactPlayer from "react-player";

import { Separator } from "@/components/ui/separator";

import { DUMMY_DESCRIPTION } from "../dummy/dummyContents";

type FreeLectureArticleProps = {
  className?: string;
};

const FreeLectureArticle = ({ className }: FreeLectureArticleProps) => {
  return (
    <article className={cn("space-y-8", className)}>
      <h1 className="text-lg font-semibold laptop:text-3xl">
        로봇 AI 무료 유튜브 강의 제목입니다.
      </h1>
      <div className="relative pt-[56.25%]">
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
      </div>
      <Separator />
      <EditorParagraph content={DUMMY_DESCRIPTION} />
    </article>
  );
};

export default FreeLectureArticle;
