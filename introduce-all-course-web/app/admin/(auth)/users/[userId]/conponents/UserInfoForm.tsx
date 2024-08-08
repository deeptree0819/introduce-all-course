"use client";

import { cn } from "@utils/common";
import { DateFnsFormat, getUtcToDateFormat } from "@utils/date";
import { ImagePlusIcon } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";

import { useGetUserById } from "@/app/hooks/admin/adminUsersHooks";
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

type UserInfoFormProps = {
  className?: string;
};

const UserInfoForm = ({ className }: UserInfoFormProps) => {
  const params = useParams<{ userId: string }>();
  const userId = +params.userId;

  const { data: user } = useGetUserById(userId);

  if (!user) return null;

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>프로필 수정</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col">
        <div className="flex flex-row space-x-7">
          <div className="text-sm text-slate-600">
            <span className="font-semibold">가입일시</span>{" "}
            {getUtcToDateFormat(user.created_at, DateFnsFormat.YYYYMMDDHHmm)}
          </div>
          <div className="text-sm text-slate-600">
            <span className="font-semibold">수정일시</span>{" "}
            {getUtcToDateFormat(user.updated_at, DateFnsFormat.YYYYMMDDHHmm)}
          </div>
        </div>
        <div className="mt-4 flex w-fit flex-row items-end space-x-20">
          <div className="flex flex-col items-start space-y-7">
            <div className="flex flex-col items-start space-y-1">
              {user.profile_url ? (
                <Image
                  src={user.profile_url}
                  alt="profile"
                  width={250}
                  height={250}
                />
              ) : (
                <div className="flex h-[250px] w-[250px] items-center justify-center rounded-md bg-slate-100">
                  <ImagePlusIcon />
                </div>
              )}
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
                defaultValue={user.user_name}
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="nickname">닉네임</Label>
              <Input
                type="text"
                id="nickname"
                placeholder="닉네임을 입력해주세요."
                defaultValue={user.nickname}
              />
            </div>
          </div>

          <div className="flex w-96 flex-col items-start space-y-7">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="userName">권한</Label>
              <Select defaultValue={user.role}>
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
                defaultValue={user.email}
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="phoneNumber">전화번호</Label>
              <Input
                type="text"
                id="phoneNumber"
                placeholder="전화번호를 입력해주세요."
                defaultValue={user.phone_number}
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="gender">성별</Label>
              <Select defaultValue={user.gender}>
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
                defaultValue={user.birthyear}
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
