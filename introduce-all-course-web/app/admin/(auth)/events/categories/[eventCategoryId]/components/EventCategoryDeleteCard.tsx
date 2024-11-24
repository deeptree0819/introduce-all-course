"use client";

import { useParams } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import EventCategoryDeleteButton from "./EventCategoryDeleteButton";

type EventCategoryDeleteCardProps = {
  className?: string;
};

const EventCategoryDeleteCard = ({
  className,
}: EventCategoryDeleteCardProps) => {
  const params = useParams<{ eventCategoryId: string }>();
  const eventCategoryId = +params.eventCategoryId;

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>커리큘럼 삭제</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row items-center justify-between">
          <div>
            <div>커리큘럼를 삭제합니다.</div>
            <div className="text-sm text-slate-700">
              카테고리에 해당하는 게시글이 없는 경우에만 삭제하실 수 있습니다.
            </div>
          </div>
          <EventCategoryDeleteButton eventCategoryId={eventCategoryId} />
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCategoryDeleteCard;
