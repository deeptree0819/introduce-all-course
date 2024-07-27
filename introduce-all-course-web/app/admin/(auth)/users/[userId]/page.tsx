"use client";

import { ChevronLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import UserDeleteCard from "./conponents/UserDeleteCard";
import UserInfoForm from "./conponents/UserInfoForm";

const AdminUsersPage = () => {
  const { back } = useRouter();
  const params = useParams<{ userId: string }>();
  const userId = +params.userId;

  return (
    <div className="flex flex-col items-start space-y-5 p-5">
      <Button onClick={() => back()} variant="ghost">
        <ChevronLeft className="-ml-2" />
        뒤로가기
      </Button>

      <div className="space-y-3 px-10">
        <Badge className="py-1 text-sm">{`회원ID: ${userId}`}</Badge>
        <UserInfoForm />
        <UserDeleteCard />
      </div>
    </div>
  );
};

export default AdminUsersPage;
