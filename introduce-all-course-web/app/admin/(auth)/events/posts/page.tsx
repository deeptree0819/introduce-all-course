import { cn } from "@utils/common";
import Link from "next/link";

import { adminButtonVariants } from "@/app/admin/components/ui/admin-button";

import EventsPostsTable from "./components/EventsPostsTable";

const AdminUsersPage = () => {
  return (
    <div className="flex flex-col space-y-10 p-5">
      <p className="text-3xl">공고소개 게시글 관리</p>
      <div className="flex max-w-[1300px] flex-col space-y-5">
        <EventsPostsTable />
        <Link
          href="/admin/events/posts/new"
          className={cn(
            adminButtonVariants({ variant: "default" }),
            "self-end"
          )}
        >
          게시글 작성
        </Link>
      </div>
    </div>
  );
};

export default AdminUsersPage;
