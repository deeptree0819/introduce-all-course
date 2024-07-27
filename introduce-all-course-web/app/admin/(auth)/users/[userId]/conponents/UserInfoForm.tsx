"use client";

import { cn } from "@utils/common";
import { DateFnsFormat, getUtcToDateFormat } from "@utils/date";
import Image from "next/image";

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
  createdAt: "2023-12-04T11:21:02.627Z",
  updatedAt: "2023-12-04T11:21:02.627Z",
  email: "example@gmail.com",
  userName: "김로보트",
  nickname: "로봇에 흠뻑 빠진 내모습",
  role: "USER",
  phoneNumber: "010-1234-5678",
  profileUrl: "https://picsum.photos/500/500",
  gender: "FEMALE",
  birthyear: "1995",
};

type UserInfoFormProps = {
  className?: string;
};

const UserInfoForm = ({ className }: UserInfoFormProps) => {
  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>프로필 수정</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col">
        <div className="flex flex-row space-x-7">
          <div className="text-sm text-slate-600">
            <span className="font-semibold">가입일시</span>{" "}
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
          <div className="flex flex-col items-start space-y-7">
            <div className="flex flex-col items-start space-y-1">
              <Image
                src={DUMMY_DATA.profileUrl}
                alt="profile"
                width={250}
                height={250}
              />
              <Input
                type="file"
                id="profile"
                className="h-fit w-[250px] border-0 p-0"
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="userName">실명</Label>
              <Input
                type="text"
                id="userName"
                placeholder="유저 실명을 입력해주세요."
                value={DUMMY_DATA.userName}
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="nickname">닉네임</Label>
              <Input
                type="text"
                id="nickname"
                placeholder="닉네임을 입력해주세요."
                value={DUMMY_DATA.nickname}
              />
            </div>
          </div>

          <div className="flex w-96 flex-col items-start space-y-7">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="userName">권한</Label>
              <Select defaultValue={DUMMY_DATA.role}>
                <SelectTrigger>
                  <SelectValue placeholder="권한을 선택해주세요." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USER">일반</SelectItem>
                  <SelectItem value="EXPERT">전문가</SelectItem>
                  <SelectItem value="SUPER">어드민</SelectItem>
                  <SelectItem value="MANAGER">매니저</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email">이메일</Label>
              <Input
                type="email"
                id="email"
                placeholder="이메일을 입력해주세요."
                value={DUMMY_DATA.email}
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="phoneNumber">전화번호</Label>
              <Input
                type="text"
                id="phoneNumber"
                placeholder="전화번호를 입력해주세요."
                value={DUMMY_DATA.phoneNumber}
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="gender">성별</Label>
              <Select defaultValue={DUMMY_DATA.gender}>
                <SelectTrigger>
                  <SelectValue placeholder="성별을 선택해주세요." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MALE">남성</SelectItem>
                  <SelectItem value="FEMALE">여성</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="birthyear">출생년도</Label>
              <Input
                type="number"
                id="birthyear"
                placeholder="전화번호를 입력해주세요."
                value={DUMMY_DATA.birthyear}
              />
            </div>
          </div>
        </div>

        <Button className="mt-10 self-end">수정</Button>
      </CardContent>
    </Card>
  );
};

export default UserInfoForm;
