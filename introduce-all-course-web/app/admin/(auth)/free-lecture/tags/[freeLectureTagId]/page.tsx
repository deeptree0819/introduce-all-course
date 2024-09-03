"use client";

import { DateFnsFormat, getUtcToDateFormat } from "@utils/date";
import { useParams } from "next/navigation";

import GoBackButton from "@/app/admin/components/GoBackButton";
import { useGetFreeLectureTagById } from "@/app/hooks/admin/adminFreeLectureHooks";
import { Badge } from "@/components/ui/badge";

import FreeLecturePostsTable from "../../components/FreeLecturePostsTable";
import FreeLectureTagDeleteCard from "./components/FreeLectureTagDeleteCard";

const AdminFreeLectureTagDetailPage = () => {
  const params = useParams<{ freeLectureTagId: string }>();
  const freeLectureTagId = +params.freeLectureTagId;

  const { data: freeLectureTag } = useGetFreeLectureTagById(freeLectureTagId);

  if (!freeLectureTag) return null;

  return (
    <div className="relative flex size-full flex-col">
      <div className="items-start space-y-5 p-5">
        <GoBackButton />
        <div className="ml-3 flex flex-col items-start space-y-3">
          <Badge className="text-lg">
            {freeLectureTag.free_lecture_tag_name}
          </Badge>
          <div className="text-sm text-slate-600">
            <span className="font-semibold">생성일시</span>{" "}
            {getUtcToDateFormat(
              freeLectureTag.created_at,
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
