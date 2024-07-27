"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import UserInfoForm from "./conponents/UserInfoForm";

const AdminUsersPage = () => {
  const { back } = useRouter();

  return (
    <div className="flex flex-col items-start space-y-10 p-5">
      <Button onClick={() => back()} variant="ghost">
        <ChevronLeft className="-ml-2" />
        뒤로가기
      </Button>

      <div className="px-10">
        <UserInfoForm />
      </div>
    </div>
  );
};

export default AdminUsersPage;
