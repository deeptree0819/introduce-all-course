"use client";

import { DateFnsFormat, getUtcToDateFormat } from "@utils/date";

import GoBackButton from "@/app/admin/components/GoBackButton";
import { Badge } from "@/components/ui/badge";

import EventsPostsTable from "../../components/EventsPostsTable";
import EventCategoryDeleteCard from "./components/EventCategoryDeleteCard";

const AdminEventCategoryDetailPage = () => {
  return (
    <div className="relative flex h-full w-full flex-col">
      <div className="items-start space-y-5 p-5">
        <GoBackButton />
        <div className="ml-3 flex flex-col items-start space-y-3">
          <Badge className="text-lg">{`부트캠프`}</Badge>
          <div className="flex flex-row space-x-5">
            <div className="text-sm text-slate-600">
              <span className="font-semibold">생성일시</span>{" "}
              {getUtcToDateFormat(
                "2023-12-04T11:21:02.627Z",
                DateFnsFormat.YYYYMMDDHHmm
              )}
            </div>
            <div className="text-sm text-slate-600">
              <span className="font-semibold">생성자</span> {`어드민`}
            </div>
          </div>
        </div>
        <EventsPostsTable />
        <EventCategoryDeleteCard className="max-w-xl" />
      </div>
    </div>
  );
};

export default AdminEventCategoryDetailPage;
