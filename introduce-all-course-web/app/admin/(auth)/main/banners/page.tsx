import { cn } from "@utils/common";
import Link from "next/link";

import { adminButtonVariants } from "@/app/admin/components/ui/admin-button";

import MainBannerTable from "./components/MainBannerTable";

const AdminMainBannersPage = () => {
  return (
    <div className="flex flex-col space-y-5 p-5">
      <p className="text-3xl">메인페이지 배너 관리</p>
      <div className="flex max-w-[1300px] flex-col space-y-5">
        <MainBannerTable />
        <Link
          href="/admin/main/banners/new"
          className={cn(
            adminButtonVariants({ variant: "default" }),
            "self-end"
          )}
        >
          배너 추가
        </Link>
      </div>
    </div>
  );
};

export default AdminMainBannersPage;
