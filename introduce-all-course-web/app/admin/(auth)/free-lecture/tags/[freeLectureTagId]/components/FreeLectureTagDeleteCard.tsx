"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import FreeLectureTagDeleteButton from "./FreeLectureTagDeleteButton";

type FreeLectureTagDeleteCardProps = {
  className?: string;
};

const FreeLectureTagDeleteCard = ({
  className,
}: FreeLectureTagDeleteCardProps) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>무료강의 태그 삭제</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row items-center justify-between">
          <div>
            <div>태그를 삭제합니다.</div>
            <div className="text-sm text-slate-700">
              카테고리에 해당하는 게시글이 없는 경우에만 삭제하실 수 있습니다.
            </div>
          </div>
          <FreeLectureTagDeleteButton freeLectureTagName={"부트캠프"} />
        </div>
      </CardContent>
    </Card>
  );
};

export default FreeLectureTagDeleteCard;
