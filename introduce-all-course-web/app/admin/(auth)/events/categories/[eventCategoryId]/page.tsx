"use client";

import { DateFnsFormat, getUtcToDateFormat } from "@utils/date";
import { useParams } from "next/navigation";

import GoBackButton from "@/app/admin/components/GoBackButton";
import { useGetEventCategoryById } from "@/app/hooks/admin/adminEventsHooks";
import { Badge } from "@/components/ui/badge";

import EventsPostsTable from "../../components/EventsPostsTable";
import EventCategoryDeleteCard from "./components/EventCategoryDeleteCard";

const AdminEventCategoryDetailPage = () => {
  const params = useParams();
  const eventCategoryId = +params.eventCategoryId;

  const { data: eventCategory } = useGetEventCategoryById(eventCategoryId);

  if (!eventCategory) return null;

  return (
    <div className="relative flex h-full w-full flex-col">
      <div className="items-start space-y-5 p-5">
        <GoBackButton />
        <div className="ml-3 flex flex-col items-start space-y-3">
          <Badge className="text-lg">{eventCategory.event_category_name}</Badge>
          <div className="text-sm text-slate-600">
            <span className="font-semibold">생성일시</span>{" "}
            {getUtcToDateFormat(
              eventCategory.created_at,
              DateFnsFormat.YYYYMMDDHHmm
            )}
          </div>
        </div>
        <EventsPostsTable />
        <EventCategoryDeleteCard className="max-w-xl" />
      </div>
    </div>
  );
};

export default AdminEventCategoryDetailPage;
