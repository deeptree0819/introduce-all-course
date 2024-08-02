"use client";

import ImageUploader from "@adminComponents/ImageUploader";
import { cn } from "@utils/common";
import { DateFnsFormat, getUtcToDateFormat } from "@utils/date";

import AdminDatePicker from "@/app/admin/components/ui/admin-datePicker";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const DUMMY_DATA = {
  id: 1,
  createdAt: "2023-12-04T11:21:02.627Z",
  updatedAt: "2023-12-04T11:21:02.627Z",
  mainBannerImageUrl: "https://picsum.photos/500/300",
  mainBannerImageName: "구름톤 딥다이브 프로덕트 매니지먼트 과정 모집",
  mainBannerUrl:
    "https://unsplash.com/photos/brown-tabby-kitten-sitting-on-floor-nKC772R_qog",
  mainBannerOpenAt: "2023-12-04T11:21:02.627Z",
  mainBannerCloseAt: "2024-12-04T11:21:02.627Z",
};

type MainBannerInfoFormProps = {
  className?: string;
};

const MainBannerInfoForm = ({ className }: MainBannerInfoFormProps) => {
  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>메인페이지 배너 수정</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col">
        <div className="flex flex-row space-x-7">
          <div className="text-sm text-slate-600">
            <span className="font-semibold">생성일시</span>{" "}
            {getUtcToDateFormat(
              DUMMY_DATA.createdAt,
              DateFnsFormat.YYYYMMDDHHmm
            )}
          </div>
          <div className="text-sm text-slate-600">
            <span className="font-semibold">수정일시</span>{" "}
            {getUtcToDateFormat(
              DUMMY_DATA.updatedAt,
              DateFnsFormat.YYYYMMDDHHmm
            )}
          </div>
        </div>
        <div className="mt-4 flex flex-row items-end space-x-20">
          <div className="flex flex-col items-start space-y-7">
            <div className="grid w-[600px] items-center gap-1.5">
              <Label htmlFor="userName">배너 이미지</Label>
              <ImageUploader
                fileId="main-banner-image-upload"
                defaultSrc={DUMMY_DATA.mainBannerImageUrl}
              />
            </div>
            <div className="grid w-[600px] items-center gap-1.5">
              <Label htmlFor="mainBannerImageName">이미지 대체텍스트</Label>
              <Input
                type="text"
                id="mainBannerImageName"
                placeholder="이미지 대체텍스트를 입력해주세요."
                defaultValue={DUMMY_DATA.mainBannerImageName}
              />
            </div>
            <div className="grid w-[600px] items-center gap-1.5">
              <Label htmlFor="mainBannerUrl">배너 링크</Label>
              <Input
                type="text"
                id="mainBannerUrl"
                placeholder="배너를 클릭하면 이동할 페이지 링크를 입력해주세요."
                defaultValue={DUMMY_DATA.mainBannerUrl}
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

        <Button className="mt-10 self-end">수정</Button>
      </CardContent>
    </Card>
  );
};

export default MainBannerInfoForm;
