import { cn } from "@utils/common";
import Link from "next/link";

import { adminButtonVariants } from "@/app/admin/components/ui/admin-button";

import EventsPostsTable from "../components/FreeLecturePostsTable";

const AdminFreeLecturePostsPage = () => {
  return (
    <div className="flex flex-col space-y-10 p-5">
      <p className="text-3xl">무료강의 게시글 관리</p>
      <div className="flex max-w-[1300px] flex-col space-y-5">
        <EventsPostsTable />
        <Link
          href="/admin/free-lecture/posts/new"
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

export default AdminFreeLecturePostsPage;
