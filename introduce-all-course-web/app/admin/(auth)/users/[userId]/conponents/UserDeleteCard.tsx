"use client";

import { useParams } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import UserDeleteButton from "./UserDeleteButton";

type UserDeleteCardProps = {
  className?: string;
};

const UserDeleteCard = ({ className }: UserDeleteCardProps) => {
  const params = useParams<{ userId: string }>();
  const userId = +params.userId;

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>회원 삭제</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row items-center justify-between">
          <div>
            <div>회원정보를 삭제합니다.</div>
            <div className="text-sm text-slate-700">
              삭제하신 이후에는 되돌릴 수 없습니다.
            </div>
          </div>
          <UserDeleteButton userId={userId} />
        </div>
      </CardContent>
    </Card>
  );
};

export default UserDeleteCard;
