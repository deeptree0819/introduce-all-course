"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@components/ui/form";
import { UpdateUserDto } from "@generated/index";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@utils/common";
import { DateFnsFormat, getUtcToDateFormat } from "@utils/date";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import {
  useGetUserById,
  useUpdateUser,
} from "@/app/hooks/admin/adminUsersHooks";
import { useUploadImage } from "@/app/hooks/fileUploadHooks";
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

import { UpdateUserSchema } from "../schema";

type UserInfoFormProps = {
  className?: string;
};

const UserInfoForm = ({ className }: UserInfoFormProps) => {
  const params = useParams<{ userId: string }>();
  const userId = +params.userId;

  const [profileUrl, setProfileUrl] = useState<string | null>(null);

  const imageRef = useRef<HTMLInputElement>(null);

  const { data: user } = useGetUserById(userId);

  const form = useForm<UpdateUserDto>({
    mode: "onSubmit",
    resolver: zodResolver(UpdateUserSchema),
  });
  const { handleSubmit } = form;
  const { mutate: updateUser } = useUpdateUser(userId);

  const { mutateAsync: uploadImage } = useUploadImage("user-profile");

  useEffect(() => {
    setProfileUrl(user?.profile_url ?? null);
  }, [user?.profile_url]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      form.setValue("profile_url", undefined);
      form.setValue("profile_thumbnail_url", undefined);
      return;
    }

    const url = await uploadImage(file);

    setProfileUrl(url);

    form.setValue("profile_url", url);
    form.setValue("profile_thumbnail_url", url);
  };

  if (!user) return null;

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>프로필 수정</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={handleSubmit((data) => updateUser(data))}
            className="flex flex-col"
          >
            <div className="flex flex-row space-x-7">
              <div className="text-sm text-slate-600">
                <span className="font-semibold">가입일시</span>{" "}
                {getUtcToDateFormat(
                  user.created_at,
                  DateFnsFormat.YYYYMMDDHHmm
                )}
              </div>
              <div className="text-sm text-slate-600">
                <span className="font-semibold">수정일시</span>{" "}
                {getUtcToDateFormat(
                  user.updated_at,
                  DateFnsFormat.YYYYMMDDHHmm
                )}
              </div>
            </div>
            <div className="mt-4 flex w-fit flex-row items-end space-x-20">
              <div className="flex flex-col items-start space-y-7">
                <div className="flex flex-col items-start space-y-2">
                  <Label>프로필 사진</Label>
                  {profileUrl ? (
                    <Image
                      src={profileUrl}
                      alt="profile"
                      width={250}
                      height={250}
                      className="cursor-pointer border border-slate-100"
                      onClick={() => {
                        setProfileUrl(null);
                        imageRef.current?.value &&
                          (imageRef.current.value = "");
                        form.setValue("profile_url", undefined);
                        form.setValue("profile_thumbnail_url", undefined);
                      }}
                    />
                  ) : (
                    <Label
                      htmlFor="profile"
                      className="flex h-[250px] w-[250px] items-center justify-center rounded-md bg-slate-200 text-4xl text-slate-700"
                    >
                      {user.nickname.at(0)}
                    </Label>
                  )}
                  <Input
                    type="file"
                    accept="image/*"
                    id="profile"
                    className="hidden h-fit w-[250px] border-0 p-0"
                    onChange={handleImageChange}
                    ref={imageRef}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="user_name"
                  render={({ field }) => (
                    <FormItem className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="userName">실명</Label>
                      <Input
                        {...field}
                        type="text"
                        id="userName"
                        placeholder="유저 실명을 입력해주세요."
                        defaultValue={user.user_name}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="nickname"
                  render={({ field }) => (
                    <FormItem className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="nickname">닉네임</Label>
                      <Input
                        {...field}
                        type="text"
                        id="nickname"
                        placeholder="닉네임을 입력해주세요."
                        defaultValue={user.nickname}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex w-96 flex-col items-start space-y-7">
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem className="grid w-full max-w-sm items-center gap-1.5">
                      <Label>권한</Label>
                      <Select
                        defaultValue={user.role}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="권한을 선택해주세요." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="USER">일반</SelectItem>
                          <SelectItem value="EXPERT">전문가</SelectItem>
                          <SelectItem value="SUPER">어드민</SelectItem>
                          <SelectItem value="MANAGER">매니저</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="email">이메일</Label>
                      <Input
                        {...field}
                        type="email"
                        id="email"
                        placeholder="이메일을 입력해주세요."
                        defaultValue={user.email}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone_number"
                  render={({ field }) => (
                    <FormItem className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="phoneNumber">전화번호</Label>
                      <Input
                        {...field}
                        type="text"
                        id="phoneNumber"
                        placeholder="전화번호를 입력해주세요."
                        defaultValue={user.phone_number}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="gender">성별</Label>
                      <Select
                        defaultValue={user.gender}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="성별을 선택해주세요." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="MALE">남성</SelectItem>
                          <SelectItem value="FEMALE">여성</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="birthyear"
                  render={({ field }) => (
                    <FormItem className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="birthyear">출생년도</Label>
                      <Input
                        {...field}
                        type="number"
                        id="birthyear"
                        placeholder="전화번호를 입력해주세요."
                        defaultValue={user.birthyear}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Button className="mt-10 self-end" type="submit">
              수정
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default UserInfoForm;
