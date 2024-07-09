import Link from "next/link";

import { adminButtonVariants } from "@/app/admin/components/ui/admin-button";

import BootCampPostsTable from "./components/BootCampPostsTable";

const AdminUsersPage = () => {
  return (
    <div className="flex flex-col space-y-10 p-5">
      <p className="text-3xl">국비지원/부트캠프 소개글 관리</p>
      <div className="flex flex-col items-end space-y-2">
        <Link
          href="/admin/boot-camp/posts/new"
          className={adminButtonVariants({ variant: "default" })}
        >
          게시글 작성
        </Link>
        <BootCampPostsTable />
      </div>
    </div>
  );
};

export default AdminUsersPage;
