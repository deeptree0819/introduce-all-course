"use client";

import { useParams } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import UserDeleteButton from "./EventPostDeleteButton";

type EventPostDeleteCardProps = {
  className?: string;
};

const EventPostDeleteCard = ({ className }: EventPostDeleteCardProps) => {
  const params = useParams<{ postId: string }>();
  const postId = +params.postId;

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>공고소개글 삭제</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row items-center justify-between">
          <div>
            <div>공고소개글을 삭제합니다.</div>
            <div className="text-sm text-slate-700">
              삭제한 이후에는 되돌릴 수 없습니다.
            </div>
          </div>
          <UserDeleteButton postId={postId} />
        </div>
      </CardContent>
    </Card>
  );
};

export default EventPostDeleteCard;
