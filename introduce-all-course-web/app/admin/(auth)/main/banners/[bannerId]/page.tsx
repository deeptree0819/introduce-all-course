"use client";

import { useParams } from "next/navigation";

import GoBackButton from "@/app/admin/components/GoBackButton";
import { Badge } from "@/components/ui/badge";

import MainBannerDeleteCard from "./components/MainBannerDeleteCard";
import MainBannerInfoForm from "./components/MainBannerInfoForm";

const AdminMainBannerDetailPage = () => {
  const params = useParams<{ bannerId: string }>();
  const bannerId = +params.bannerId;

  return (
    <div className="flex flex-col items-start space-y-5 p-5">
      <GoBackButton />

      <div className="space-y-3 px-10">
        <Badge className="py-1 text-sm">{`배너ID: ${bannerId}`}</Badge>
        <MainBannerInfoForm />
        <MainBannerDeleteCard />
      </div>
    </div>
  );
};

export default AdminMainBannerDetailPage;
