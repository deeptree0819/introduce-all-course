"use client";

import { DateFnsFormat, getUtcToDateFormat } from "@utils/date";
import { useParams } from "next/navigation";

import GoBackButton from "@/app/admin/components/GoBackButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import EventsPostForm from "../components/EventsPostForm";

const AdminEventPostDetailPage = () => {
  const params = useParams<{ postId: string }>();
  const postId = +params.postId;

  return (
    <div className="relative flex h-full flex-col">
      <div className="flex grow flex-col items-start space-y-8 p-5 pb-32">
        <GoBackButton />
        <div className="ml-3 flex flex-row items-center space-x-5">
          <Badge className="text-sm">{`공고ID: ${postId}`}</Badge>
          <div className="text-sm text-slate-600">
            <span className="font-semibold">생성일시</span>{" "}
            {getUtcToDateFormat(
              "2023-12-04T11:21:02.627Z",
              DateFnsFormat.YYYYMMDDHHmm
            )}
          </div>
          <div className="text-sm text-slate-600">
            <span className="font-semibold">수정일시</span>{" "}
            {getUtcToDateFormat(
              "2023-12-04T11:21:02.627Z",
              DateFnsFormat.YYYYMMDDHHmm
            )}
          </div>
          <div className="text-sm text-slate-600">
            <span className="font-semibold">작성자</span> {`어드민`}
          </div>
          <div className="text-sm text-slate-600">
            <span className="font-semibold">수정자</span> {`매니저`}
          </div>
        </div>

        <div className="mx-5">
          <EventsPostForm />
        </div>
      </div>
      <div className="fixed bottom-0 left-0 flex w-full flex-row items-center justify-end border-t border-slate-300 bg-white px-7 py-3 shadow">
        <Button>수정</Button>
      </div>
    </div>
  );
};

export default AdminEventPostDetailPage;
