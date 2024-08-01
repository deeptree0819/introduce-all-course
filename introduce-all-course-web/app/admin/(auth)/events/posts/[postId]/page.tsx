"use client";

import { useParams } from "next/navigation";

import GoBackButton from "@/app/admin/components/GoBackButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import EventsPostForm from "../new/components/EventsPostForm";

const AdminEventPostDetailPage = () => {
  const params = useParams<{ postId: string }>();
  const postId = +params.postId;

  return (
    <div className="relative flex h-full flex-col">
      <div className="flex grow flex-col items-start space-y-5 p-5 pb-32">
        <GoBackButton />
        <Badge className="ml-3 py-1 text-sm">{`공고ID: ${postId}`}</Badge>
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
