"use client";

import { cn } from "@utils/common";
import { DateFnsFormat, getUtcToDateFormat } from "@utils/date";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DUMMY_DATA = {
  id: 1,
  createdAt: "2023-12-04T11:21:02.627Z",
  updatedAt: "2023-12-04T11:21:02.627Z",
  adminName: "어드민",
  adminRole: "SUPER",
  adminEmail: "admin@gmail.com",
  adminPassword: "asdf1234",
};

type AdminInfoFormProps = {
  className?: string;
};

const AdminInfoForm = ({ className }: AdminInfoFormProps) => {
  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>어드민 수정</CardTitle>
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
        <div className="mt-4 flex w-fit flex-row items-end space-x-20">
          <div className="flex w-96 flex-col items-start space-y-7">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="userName">권한</Label>
              <Select defaultValue={DUMMY_DATA.adminRole}>
                <SelectTrigger>
                  <SelectValue placeholder="권한을 선택해주세요." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SUPER">어드민</SelectItem>
                  <SelectItem value="MANAGER">매니저</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="userName">이름</Label>
              <Input
                type="text"
                id="userName"
                placeholder="유저 실명을 입력해주세요."
                defaultValue={DUMMY_DATA.adminName}
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email">이메일</Label>
              <Input
                type="email"
                id="email"
                placeholder="이메일을 입력해주세요."
                defaultValue={DUMMY_DATA.adminEmail}
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="password">비밀번호</Label>
              <Input
                type="password"
                id="password"
                placeholder="비밀번호를 입력해주세요."
                defaultValue={DUMMY_DATA.adminEmail}
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="passwordCheck">비밀번호 확인</Label>
              <Input
                type="password"
                id="passwordCheck"
                placeholder="비밀번호를 다시 한 번 입력해주세요."
              />
            </div>
          </div>
        </div>

        <Button className="mt-10 self-end">수정</Button>
      </CardContent>
    </Card>
  );
};

export default AdminInfoForm;
