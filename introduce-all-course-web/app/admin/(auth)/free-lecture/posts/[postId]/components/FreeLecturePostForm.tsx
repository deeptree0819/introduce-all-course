"use client";

import AdminEditor from "@adminComponents/AdminEditor";
import ImageUploader from "@adminComponents/ImageUploader";
import { Form, FormField, FormItem, FormMessage } from "@components/ui/form";
import { UpdateFreeLectureDto } from "@generated/index";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { forwardRef } from "react";
import { useForm } from "react-hook-form";

import {
  useGetFreeLectureById,
  useUpdateFreeLecture,
} from "@/app/hooks/admin/adminFreeLectureHooks";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import FreeLectureTagSelector from "../../components/FreeLectureTagSelector";
import { UpdateFreeLectureSchema } from "../schema";

const FreeLecturePostForm = forwardRef<HTMLFormElement>((props, ref) => {
  const params = useParams<{ postId: string }>();
  const postId = +params.postId;

  const form = useForm<UpdateFreeLectureDto>({
    mode: "onSubmit",
    resolver: zodResolver(UpdateFreeLectureSchema),
  });
  const { handleSubmit } = form;
  const { mutate: updateEvent } = useUpdateFreeLecture(postId);

  const { data: post } = useGetFreeLectureById(postId);

  if (!post) return null;

  return (
    <Form {...form}>
      <form
        ref={ref}
        className="space-y-6"
        onSubmit={handleSubmit((data) => updateEvent(data))}
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
                defaultValue={post.free_lecture_title}
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
                defaultValue={post.free_lecture_url}
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
                defaultValue={post.free_lecture_tags}
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
                defaultSrc={post.free_lecture_thumbnail_url}
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
            defaultValue={JSON.parse(post.free_lecture_description)}
          />
        </div>
      </form>
    </Form>
  );
});
FreeLecturePostForm.displayName = "FreeLecturePostForm";

export default FreeLecturePostForm;
