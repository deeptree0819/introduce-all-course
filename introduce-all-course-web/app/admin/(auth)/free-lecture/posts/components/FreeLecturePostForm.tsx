"use client";

import AdminEditor from "@adminComponents/AdminEditor";
import ImageUploader from "@adminComponents/ImageUploader";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import FreeLectureTagSelector from "./FreeLectureTagSelector";

const FreeLecturePostForm = () => {
  return (
    <div className="space-y-6">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="title">무료강의 제목</Label>
        <Input
          type="text"
          id="title"
          placeholder="무료강의 제목을 입력해주세요."
        />
      </div>

      <FreeLectureTagSelector />

      <div className="grid w-full max-w-2xl items-center gap-1.5 ">
        <Label>썸네일 (16:9 비율)</Label>
        <ImageUploader fileId="poster-image-upload" />
      </div>

      <Separator className="max-w-[1042px]" />

      <div className="grid max-w-[1042px] items-center gap-1.5">
        <Label>상세설명</Label>
        <AdminEditor />
      </div>
    </div>
  );
};

export default FreeLecturePostForm;
