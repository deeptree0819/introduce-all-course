"use client";

import DatePicker from "@components/ui/datePicker";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import ImageUploader from "../../../../../components/ImageUploader";
import AdminEditor from "./AdminEditor";
import AttachmentsUploader from "./AttachmentsUploader";

const EventsPostForm = () => {
  return (
    <div className="space-y-6">
      <div className="grid w-80 items-center gap-1.5">
        <Label>공고 썸네일 (정사각형 비율)</Label>
        <ImageUploader fileId="thumbnail-image-upload" />
      </div>
      <Separator />
      <header className="grid grid-cols-[minmax(0,450px)_minmax(250px,1fr)] items-start justify-center gap-x-5 gap-y-10">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="title">공고명</Label>
          <Input type="text" id="title" placeholder="공고명을 입력해주세요." />
        </div>
        <div className="flex flex-row gap-x-2">
          <div className="grid items-center gap-1.5">
            <Label>공고 시작일</Label>
            <DatePicker />
          </div>
          <div className="grid items-center gap-1.5">
            <Label>공고 종료일</Label>
            <DatePicker />
          </div>
        </div>
        <div className="grid items-center gap-1.5">
          <Label>공고 포스터 (A4 비율)</Label>
          <ImageUploader fileId="poster-image-upload" />
        </div>
        <div className="grid max-w-xl items-center gap-1.5">
          <Label>공고 정보</Label>
          <AdminEditor />
        </div>
      </header>
      <Separator />
      <section className="space-y-6">
        <div className="grid max-w-[1042px] items-center gap-1.5">
          <Label>공고 상세설명</Label>
          <AdminEditor />
        </div>
        <Separator className="my-3" />
        <AttachmentsUploader />
      </section>
    </div>
  );
};

export default EventsPostForm;
