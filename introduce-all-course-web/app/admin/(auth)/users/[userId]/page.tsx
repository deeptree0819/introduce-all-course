"use client";

import { useParams } from "next/navigation";

import GoBackButton from "@/app/admin/components/GoBackButton";
import { Badge } from "@/components/ui/badge";

import UserDeleteCard from "./conponents/UserDeleteCard";
import UserInfoForm from "./conponents/UserInfoForm";

const AdminUsersPage = () => {
  const params = useParams<{ userId: string }>();
  const userId = +params.userId;

  return (
    <div className="flex flex-col items-start space-y-5 p-5">
      <GoBackButton />

      <div className="space-y-3 px-10">
        <Badge className="py-1 text-sm">{`회원ID: ${userId}`}</Badge>
        <UserInfoForm />
        <UserDeleteCard />
      </div>
    </div>
  );
};

export default AdminUsersPage;
