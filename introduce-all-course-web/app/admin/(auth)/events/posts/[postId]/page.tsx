"use client";

import { DateFnsFormat, getUtcToDateFormat } from "@utils/date";
import { useParams } from "next/navigation";
import { useRef } from "react";

import GoBackButton from "@/app/admin/components/GoBackButton";
import { useGetEventById } from "@/app/hooks/admin/adminEventsHooks";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import EventPostDeleteCard from "./components/EventPostDeleteCard";
import EventsPostForm from "./components/EventsPostForm";

const AdminEventPostDetailPage = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const params = useParams<{ postId: string }>();
  const postId = +params.postId;

  const { data: eventPost } = useGetEventById(postId);

  const handleFormSubmit = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  if (!eventPost) return null;

  return (
    <div className="relative flex h-full flex-col">
      <div className="flex grow flex-col items-start space-y-8 p-5 pb-32">
        <GoBackButton />
        <div className="ml-3 flex flex-row items-center space-x-5">
          <Badge className="text-sm">{`공고ID: ${postId}`}</Badge>
          <div className="text-sm text-slate-600">
            <span className="font-semibold">생성일시</span>{" "}
            {getUtcToDateFormat(
              eventPost.created_at,
              DateFnsFormat.YYYYMMDDHHmm
            )}
          </div>
          <div className="text-sm text-slate-600">
            <span className="font-semibold">수정일시</span>{" "}
            {getUtcToDateFormat(
              eventPost.updated_at,
              DateFnsFormat.YYYYMMDDHHmm
            )}
          </div>
          <div className="text-sm text-slate-600">
            <span className="font-semibold">작성자</span>{" "}
            {eventPost.created_by.admin_name || ""}
          </div>
          <div className="text-sm text-slate-600">
            <span className="font-semibold">수정자</span>{" "}
            {eventPost.updated_by.admin_name || ""}
          </div>
        </div>

        <div className="mx-5">
          <EventsPostForm ref={formRef} />
        </div>

        <EventPostDeleteCard className="mx-5 w-[500px]" />
      </div>
      <div className="fixed bottom-0 left-0 flex w-full flex-row items-center justify-end border-t border-slate-300 bg-white px-7 py-3 shadow">
        <Button type="button" onClick={handleFormSubmit}>
          수정
        </Button>
      </div>
    </div>
  );
};

export default AdminEventPostDetailPage;
