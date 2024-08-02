"use client";

import { DateFnsFormat, getUtcToDateFormat } from "@utils/date";

import GoBackButton from "@/app/admin/components/GoBackButton";
import { Badge } from "@/components/ui/badge";

import FreeLecturePostsTable from "../../components/FreeLecturePostsTable";
import FreeLectureTagDeleteCard from "./components/FreeLectureTagDeleteCard";

const AdminFreeLectureTagDetailPage = () => {
  return (
    <div className="relative flex h-full w-full flex-col">
      <div className="items-start space-y-5 p-5">
        <GoBackButton />
        <div className="ml-3 flex flex-col items-start space-y-3">
          <Badge className="text-lg">{`인공지능`}</Badge>
          <div className="text-sm text-slate-600">
            <span className="font-semibold">생성일시</span>{" "}
            {getUtcToDateFormat(
              "2023-12-04T11:21:02.627Z",
              DateFnsFormat.YYYYMMDDHHmm
            )}
          </div>
        </div>
        <FreeLecturePostsTable />
        <FreeLectureTagDeleteCard className="max-w-xl" />
      </div>
    </div>
  );
};

export default AdminFreeLectureTagDetailPage;
