"use client";

import AdminEditor from "@adminComponents/AdminEditor";
import ImageUploader from "@adminComponents/ImageUploader";
import { Form, FormField, FormItem, FormMessage } from "@components/ui/form";
import { AdminCreateFreeLectureDto } from "@generated/index";
import { zodResolver } from "@hookform/resolvers/zod";
import { forwardRef } from "react";
import { useForm } from "react-hook-form";

import { useCreateFreeLecture } from "@/app/hooks/admin/adminFreeLectureHooks";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import FreeLectureTagSelector from "../../components/FreeLectureTagSelector";
import { CreateFreeLectureSchema } from "../schema";

const CreateFreeLecturePostForm = forwardRef<HTMLFormElement>((props, ref) => {
  const form = useForm<AdminCreateFreeLectureDto>({
    mode: "onSubmit",
    resolver: zodResolver(CreateFreeLectureSchema),
  });
  const { handleSubmit } = form;
  const { mutate: createEvent } = useCreateFreeLecture();

  return (
    <Form {...form}>
      <form
        ref={ref}
        className="space-y-6"
        onSubmit={handleSubmit((data) => createEvent(data))}
      >
        <FormField
          control={form.control}
          name="free_lecture_title"
          render={({ field }) => (
            <FormItem className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="title">무료강의 제목*</Label>
              <Input
                {...field}
                type="text"
                id="title"
                placeholder="무료강의 제목을 입력해주세요."
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="free_lecture_channel_name"
          render={({ field }) => (
            <FormItem className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="title">무료강의 채널명*</Label>
              <Input
                {...field}
                type="text"
                id="channel-name"
                placeholder="무료강의 채널명을 입력해주세요."
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="free_lecture_url"
          render={({ field }) => (
            <FormItem className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="free_lecture_url">유튜브 링크*</Label>
              <Input
                {...field}
                type="text"
                id="free_lecture_url"
                placeholder="유튜브 링크를 입력해주세요."
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="free_lecture_tags"
          render={() => (
            <FormItem className="grid w-full max-w-sm items-center gap-1.5">
              <FreeLectureTagSelector
                onChange={(tagIds) =>
                  form.setValue("free_lecture_tags", tagIds)
                }
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="free_lecture_thumbnail_url"
          render={() => (
            <FormItem className="grid w-full max-w-2xl items-center gap-1.5">
              <Label>썸네일 (16:9 비율)*</Label>
              <ImageUploader
                fileId="thumbnail-image-upload"
                onUpload={(url) =>
                  form.setValue("free_lecture_thumbnail_url", url)
                }
                fileTag="free-lecture-thumbnail"
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <Separator className="max-w-[1042px]" />

        <div className="grid max-w-[1042px] items-center gap-1.5">
          <Label>상세설명</Label>
          <AdminEditor
            onChange={(content) => {
              form.setValue(
                "free_lecture_description",
                JSON.stringify(content)
              );
            }}
          />
        </div>
      </form>
    </Form>
  );
});
CreateFreeLecturePostForm.displayName = "CreateFreeLecturePostForm";

export default CreateFreeLecturePostForm;
