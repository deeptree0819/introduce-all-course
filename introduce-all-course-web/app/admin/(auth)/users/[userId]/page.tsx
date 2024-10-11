"use client";

import { useParams } from "next/navigation";

import GoBackButton from "@/app/admin/components/GoBackButton";
import { useGetUserById } from "@/app/hooks/admin/adminUsersHooks";
import { Badge } from "@/components/ui/badge";

import UserDeleteCard from "./conponents/UserDeleteCard";
import UserInfoForm from "./conponents/UserInfoForm";

const AdminUsersPage = () => {
  const params = useParams<{ userId: string }>();
  const userId = +params.userId;

  const { data: user } = useGetUserById(userId);
  const isDeleted = user?.deleted;

  return (
    <div className="flex flex-col items-start space-y-5 p-5">
      <GoBackButton />

      <div className="space-y-3 px-10">
        {isDeleted && <p className="text-red-500">탈퇴한 회원입니다.</p>}
        <Badge className="py-1 text-sm">{`회원ID: ${userId}`}</Badge>
        <UserInfoForm />
        {!isDeleted && <UserDeleteCard />}
      </div>
    </div>
  );
};

export default AdminUsersPage;
