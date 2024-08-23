"use client";

import { useParams } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import MainBannerDeleteButton from "./MainBannerDeleteButton";

type EventCategoryDeleteCardProps = {
  className?: string;
};

const MainBannerDeleteCard = ({ className }: EventCategoryDeleteCardProps) => {
  const params = useParams<{ bannerId: string }>();
  const bannerId = +params.bannerId;

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>메인페이지 배너 삭제</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row items-center justify-between">
          <div>
            <div>메인페이지 배너를 삭제합니다.</div>
            <div className="text-sm text-slate-700">
              삭제한 이후에는 되돌릴 수 없습니다.
            </div>
          </div>
          <MainBannerDeleteButton bannerId={bannerId} />
        </div>
      </CardContent>
    </Card>
  );
};

export default MainBannerDeleteCard;
