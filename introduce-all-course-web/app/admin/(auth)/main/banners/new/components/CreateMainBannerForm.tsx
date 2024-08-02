"use client";

import ImageUploader from "@adminComponents/ImageUploader";
import { cn } from "@utils/common";

import AdminDatePicker from "@/app/admin/components/ui/admin-datePicker";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type CreateMainBannerFormProps = {
  className?: string;
};

const CreateMainBannerForm = ({ className }: CreateMainBannerFormProps) => {
  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>메인페이지 배너 등록</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col">
        <div className="mt-4 flex flex-row items-end space-x-20">
          <div className="flex flex-col items-start space-y-7">
            <div className="grid w-[600px] items-center gap-1.5">
              <Label htmlFor="userName">배너 이미지</Label>
              <ImageUploader fileId="main-banner-image-upload" />
            </div>
            <div className="grid w-[600px] items-center gap-1.5">
              <Label htmlFor="mainBannerImageName">이미지 대체텍스트</Label>
              <Input
                type="text"
                id="mainBannerImageName"
                placeholder="이미지 대체텍스트를 입력해주세요."
              />
            </div>
            <div className="grid w-[600px] items-center gap-1.5">
              <Label htmlFor="mainBannerUrl">배너 링크</Label>
              <Input
                type="text"
                id="mainBannerUrl"
                placeholder="배너를 클릭하면 이동할 페이지 링크를 입력해주세요."
              />
            </div>
            <div className="flex flex-row items-center justify-start space-x-5">
              <div className="grid items-center gap-1.5">
                <Label htmlFor="password">노출 시작일</Label>
                <AdminDatePicker />
              </div>
              <div className="grid items-center gap-1.5">
                <Label htmlFor="passwordCheck">노출 종료일</Label>
                <AdminDatePicker />
              </div>
            </div>
          </div>
        </div>

        <Button className="mt-10 self-end">등록</Button>
      </CardContent>
    </Card>
  );
};

export default CreateMainBannerForm;
