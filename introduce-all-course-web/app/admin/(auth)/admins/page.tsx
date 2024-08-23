import { adminButtonVariants } from "@adminComponents/ui/admin-button";
import { cn } from "@utils/common";
import Link from "next/link";

import AdminTable from "./components/AdminTable";

const AdminUsersPage = () => {
  return (
    <div className="flex flex-col space-y-10 p-5">
      <p className="text-3xl">어드민 정보 관리</p>
      <div className="flex flex-col space-y-3">
        <AdminTable />
        <Link
          href="/admin/admins/new"
          className={cn(
            adminButtonVariants({ variant: "default" }),
            "self-end"
          )}
        >
          어드민 추가
        </Link>
      </div>
    </div>
  );
};

export default AdminUsersPage;
