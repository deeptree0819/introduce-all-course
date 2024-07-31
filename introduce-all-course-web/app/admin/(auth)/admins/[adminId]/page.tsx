"use client";

import { useParams } from "next/navigation";

import GoBackButton from "@/app/admin/components/GoBackButton";
import { Badge } from "@/components/ui/badge";

import AdminDeleteCard from "./conponents/AdminDeleteCard";
import AdminInfoForm from "./conponents/AdminInfoForm";

const AdminUsersPage = () => {
  const params = useParams<{ adminId: string }>();
  const adminId = +params.adminId;

  return (
    <div className="flex flex-col items-start space-y-5 p-5">
      <GoBackButton />

      <div className="space-y-3 px-10">
        <Badge className="py-1 text-sm">{`회원ID: ${adminId}`}</Badge>
        <AdminInfoForm />
        <AdminDeleteCard />
      </div>
    </div>
  );
};

export default AdminUsersPage;
