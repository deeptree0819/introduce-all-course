"use client";

import AdminEditor from "@adminComponents/AdminEditor";
import AttachmentsUploader from "@adminComponents/AttachmentsUploader";
import { DatePickerForm } from "@adminComponents/DatePickerForm";
import ImageUploader from "@adminComponents/ImageUploader";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@components/ui/form";
import { UpdateEventDto } from "@generated/index";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { forwardRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import {
  useGetAllEventCategoriesWithPagination,
  useGetEventById,
  useUpdateEvent,
} from "@/app/hooks/admin/adminEventsHooks";
import { useUploadFile } from "@/app/hooks/fileUploadHooks";
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

import { UpdateEventSchema } from "../schema";

const EventsPostForm = forwardRef<HTMLFormElement>((props, ref) => {
  const fileState = useState<(File | string)[]>([]);
  const [files, setFiles] = fileState;

  const params = useParams<{ postId: string }>();
  const postId = +params.postId;

  const form = useForm<UpdateEventDto>({
    mode: "onSubmit",
    resolver: zodResolver(UpdateEventSchema),
  });
  const { handleSubmit } = form;

  const { data: eventPost } = useGetEventById(postId);
  const { mutate: updateEvent } = useUpdateEvent(postId);

  const { data: eventCategories } = useGetAllEventCategoriesWithPagination({
    page: 1,
    itemsPerPage: 30,
  });

  const { mutateAsync: uploadFile } = useUploadFile("event-attachments");

  useEffect(() => {
    if (eventPost && eventPost.event_attachment_urls)
      setFiles(eventPost.event_attachment_urls);
  }, [eventPost, setFiles, eventPost?.event_attachment_urls]);

  if (!eventPost) return null;

  return (
    <Form {...form}>
      <form
        ref={ref}
        className="space-y-6"
        onSubmit={handleSubmit(
          async (data) => {
            const event_attachment_urls = await Promise.all(
              files.map((file) =>
                file instanceof File ? uploadFile(file) : file
              )
            );
            updateEvent({ ...data, event_attachment_urls });
          },
          (error) => console.log(error)
        )}
      >
        <div className="flex flex-row space-x-5">
          <FormField
            control={form.control}
            name="event_thumbnail_url"
            render={() => (
              <FormItem className="grid w-80 items-center gap-1.5">
                <Label>공고 썸네일 (정사각형 비율)</Label>
                <ImageUploader
                  fileId="thumbnail-image-upload"
                  onUpload={(url) => form.setValue("event_thumbnail_url", url)}
                  fileTag="event-thumbnail"
                  defaultSrc={eventPost.event_thumbnail_url}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="event_organization"
            render={({ field }) => (
              <FormItem className="flex w-56 flex-col space-y-1.5">
                <Label htmlFor="organization">공고기관</Label>
                <Input
                  {...field}
                  type="text"
                  id="organization"
                  placeholder="공고기관을 입력해주세요."
                  defaultValue={eventPost.event_organization}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="event_category_id"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-1.5">
                <Label>공고 분야</Label>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={eventPost.event_category_id.toString()}
                >
                  <FormControl>
                    <SelectTrigger className="w-56">
                      <SelectValue placeholder="공고분야를 선택해주세요." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {eventCategories?.items.map((category) => (
                      <SelectItem
                        key={category.event_categories_id}
                        value={category.event_categories_id.toString()}
                      >
                        {category.event_category_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator />

        <header className="grid grid-cols-[minmax(0,450px)_minmax(250px,1fr)] items-start justify-center gap-x-5 gap-y-10">
          <FormField
            control={form.control}
            name="event_title"
            render={({ field }) => (
              <FormItem className="grid w-full items-center gap-1.5">
                <Label htmlFor="title">공고명</Label>
                <Input
                  {...field}
                  type="text"
                  id="title"
                  placeholder="공고명을 입력해주세요."
                  defaultValue={eventPost.event_title}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-row items-start gap-x-2">
            <FormField
              control={form.control}
              name="event_start_at"
              render={({ field }) => (
                <FormItem className="grid items-center gap-1.5">
                  <Label>공고 시작일</Label>
                  <DatePickerForm
                    field={field}
                    defaultValue={eventPost.event_start_at}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="event_end_at"
              render={({ field }) => (
                <FormItem className="grid items-center gap-1.5">
                  <Label>공고 종료일</Label>
                  <DatePickerForm
                    field={field}
                    defaultValue={eventPost.event_end_at}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="event_poster_image_url"
            render={() => (
              <FormItem className="grid items-center gap-1.5">
                <Label>공고 포스터 (A4 비율)</Label>
                <ImageUploader
                  fileId="poster-image-upload"
                  onUpload={(url) =>
                    form.setValue("event_poster_image_url", url)
                  }
                  fileTag="event-poster"
                  defaultSrc={eventPost.event_poster_image_url}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="event_info"
            render={() => (
              <FormItem className="grid max-w-xl items-center gap-1.5">
                <Label>공고 정보</Label>
                <AdminEditor
                  onChange={(content) => {
                    form.setValue("event_info", JSON.stringify(content));
                  }}
                  defaultValue={JSON.parse(eventPost.event_info)}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </header>

        <Separator />

        <section className="space-y-6">
          <div className="grid max-w-[1042px] items-center gap-1.5">
            <Label>공고 상세설명</Label>
            <AdminEditor
              onChange={(content) => {
                form.setValue("event_description", JSON.stringify(content));
              }}
              defaultValue={JSON.parse(eventPost.event_description)}
            />
          </div>
          <Separator className="my-3" />
          <AttachmentsUploader fileState={fileState} />
        </section>
      </form>
    </Form>
  );
});
EventsPostForm.displayName = "EventsPostForm";

export default EventsPostForm;
