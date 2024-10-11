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
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { useUploadImage } from "@/app/hooks/fileUploadHooks";
import { useFindMe, useUpdateMe } from "@/app/hooks/user/userHooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

import { UpdateUserSchema } from "../schema";

const ProfileInfoForm = () => {
  const [profileUrl, setProfileUrl] = useState<string | null>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  const { data: me } = useFindMe();

  const form = useForm<UpdateUserDto>({
    mode: "onSubmit",
    resolver: zodResolver(UpdateUserSchema),
  });
  const { handleSubmit } = form;
  const { mutate: updateMe } = useUpdateMe();
  const { mutateAsync: uploadImage } = useUploadImage("user-profile");

  useEffect(() => {
    setProfileUrl(me?.profile_url ?? null);
  }, [me?.profile_url]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      form.setValue("profile_url", undefined);
      return;
    }

    const url = await uploadImage(file);

    setProfileUrl(url);

    form.setValue("profile_url", url);
  };

  if (!me) return null;

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit((data) => updateMe(data))}
        className="flex w-full flex-col"
      >
        <h1 className="text-2xl">프로필 정보</h1>
        <Separator className="mb-7 mt-3 w-full" />
        <div className="flex flex-col space-y-7">
          <div className="flex flex-col items-start space-y-2">
            <Label>프로필 사진</Label>
            {profileUrl ? (
              <div className="group relative">
                <div className="absolute right-3 top-3 rounded p-1 opacity-100 group-hover:opacity-100 laptop:opacity-0">
                  <div className="rounded bg-white px-2 py-1 text-sm font-semibold text-slate-700">
                    삭제
                  </div>
                </div>
                <Image
                  src={profileUrl}
                  alt="profile"
                  width={250}
                  height={250}
                  className="cursor-pointer border border-slate-100"
                  onClick={() => {
                    setProfileUrl(null);
                    imageRef.current?.value && (imageRef.current.value = "");
                    form.setValue("profile_url", undefined);
                  }}
                />
              </div>
            ) : (
              <div className="group relative">
                <div className="absolute right-3 top-3 rounded p-1 opacity-100 group-hover:opacity-100 laptop:opacity-0">
                  <div className="rounded bg-white px-2 py-1 text-sm font-semibold text-slate-700">
                    업로드
                  </div>
                </div>
                <Label
                  htmlFor="profile"
                  className="flex size-[250px] items-center justify-center rounded-md bg-slate-200 text-4xl text-slate-700"
                >
                  {me.nickname.at(0)}
                </Label>
              </div>
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

          <div className="flex flex-col space-y-3">
            <Label>실명</Label>
            <span>{me.user_name || "실명이 존재하지 않습니다.."}</span>
          </div>

          <div className="flex flex-col space-y-3">
            <Label>전화번호</Label>
            <span>{me.phone_number || "전화번호가 존재하지 않습니다."}</span>
          </div>

          <FormField
            control={form.control}
            name="nickname"
            render={({ field }) => (
              <FormItem className="grid w-full max-w-sm items-center gap-1">
                <Label htmlFor="nickname">닉네임</Label>
                <Input
                  {...field}
                  type="text"
                  id="nickname"
                  placeholder="닉네임을 입력해주세요."
                  defaultValue={me.nickname}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="grid w-full max-w-sm items-center gap-1">
                <Label htmlFor="email">이메일</Label>
                <Input
                  {...field}
                  type="email"
                  id="email"
                  placeholder="이메일을 입력해주세요."
                  defaultValue={me.email}
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
                <Select defaultValue={me.gender} onValueChange={field.onChange}>
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
              <FormItem className="grid w-full max-w-sm items-center gap-1">
                <Label htmlFor="birthyear">출생년도</Label>
                <Input
                  {...field}
                  type="number"
                  id="birthyear"
                  placeholder="출생년도를 입력해주세요."
                  defaultValue={me.birthyear}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="mt-7 w-fit">
          수정하기
        </Button>
      </form>
    </Form>
  );
};

export default ProfileInfoForm;
