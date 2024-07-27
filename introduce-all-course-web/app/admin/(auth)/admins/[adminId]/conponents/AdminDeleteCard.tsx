"use client";

import { useParams } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import UserDeleteButton from "./AdminDeleteButton";

type AdminDeleteCardProps = {
  className?: string;
};

const AdminDeleteCard = ({ className }: AdminDeleteCardProps) => {
  const params = useParams<{ adminId: string }>();
  const adminId = +params.adminId;

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
          <UserDeleteButton adminId={adminId} />
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminDeleteCard;
