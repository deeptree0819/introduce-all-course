"use client";

import { DateFnsFormat, getUtcToDateFormat } from "@utils/date";
import { useParams } from "next/navigation";
import { useRef } from "react";

import GoBackButton from "@/app/admin/components/GoBackButton";
import { useGetFreeLectureById } from "@/app/hooks/admin/adminFreeLectureHooks";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import FreeLecturePostDeleteCard from "./components/FreeLecturePostDeleteCard";
import EventsPostForm from "./components/FreeLecturePostForm";

const AdminFreeLecturePostDetailPage = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const params = useParams<{ postId: string }>();
  const postId = +params.postId;

  const { data: post } = useGetFreeLectureById(postId);

  const handleFormSubmit = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  if (!post) return null;

  return (
    <div className="relative flex h-full flex-col">
      <div className="items-start space-y-8 p-5 pb-32">
        <GoBackButton />
        <div className="ml-3 flex flex-row items-center space-x-5">
          <Badge className="text-sm">{`무료강의ID: ${postId}`}</Badge>
          <div className="text-sm text-slate-600">
            <span className="font-semibold">생성일시</span>{" "}
            {getUtcToDateFormat(post.created_at, DateFnsFormat.YYYYMMDDHHmm)}
          </div>
          <div className="text-sm text-slate-600">
            <span className="font-semibold">수정일시</span>{" "}
            {getUtcToDateFormat(post.updated_at, DateFnsFormat.YYYYMMDDHHmm)}
          </div>
          <div className="text-sm text-slate-600">
            <span className="font-semibold">작성자</span>{" "}
            {post.created_by.admin_name}
          </div>
          <div className="text-sm text-slate-600">
            <span className="font-semibold">수정자</span>{" "}
            {post.updated_by.admin_name}
          </div>
        </div>

        <div className="mx-5">
          <EventsPostForm ref={formRef} />
        </div>

        <FreeLecturePostDeleteCard className="mx-5 w-[500px]" />
      </div>
      <div className="fixed bottom-0 left-0 flex w-full flex-row items-center justify-end border-t border-slate-300 bg-white px-7 py-3 shadow">
        <Button type="button" onClick={handleFormSubmit}>
          수정
        </Button>
      </div>
    </div>
  );
};

export default AdminFreeLecturePostDetailPage;
