"use client";

import { DatePickerForm } from "@adminComponents/DatePickerForm";
import ImageUploader from "@adminComponents/ImageUploader";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { CreateMainBannerDto } from "@generated/index";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@utils/common";
import { useForm } from "react-hook-form";

import { useCreateMainBanner } from "@/app/hooks/admin/adminMainBannersHooks";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { CreateMainBannerSchema } from "../schema";

type CreateMainBannerFormProps = {
  className?: string;
};

const CreateMainBannerForm = ({ className }: CreateMainBannerFormProps) => {
  const form = useForm<CreateMainBannerDto>({
    mode: "onSubmit",
    resolver: zodResolver(CreateMainBannerSchema),
    defaultValues: {
      main_banner_image_name: "",
      main_banner_url: "",
      main_banner_open_at: undefined,
      main_banner_close_at: undefined,
    },
  });
  const { handleSubmit } = form;
  const { mutate: createMainBanner } = useCreateMainBanner();

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>메인페이지 배너 등록</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col">
        <Form {...form}>
          <form
            onSubmit={handleSubmit(
              (data) => createMainBanner(data),
              (error) => {
                console.log(error);
                // TODO: Implement image upload
              }
            )}
            className="flex flex-col"
          >
            <div className="mt-4 flex flex-row items-end space-x-20">
              <div className="flex flex-col items-start space-y-7">
                <div className="grid w-[600px] items-center gap-1.5">
                  <Label htmlFor="userName">배너 이미지 (16:9 비율)</Label>
                  <ImageUploader fileId="main-banner-image-upload" />
                </div>

                <FormField
                  control={form.control}
                  name="main_banner_image_name"
                  render={({ field }) => (
                    <FormItem className="grid w-[600px] items-center gap-1.5">
                      <Label htmlFor="mainBannerImageName">
                        이미지 대체텍스트
                      </Label>
                      <Input
                        {...field}
                        type="text"
                        id="mainBannerImageName"
                        placeholder="이미지 대체텍스트를 입력해주세요."
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="main_banner_url"
                  render={({ field }) => (
                    <FormItem className="grid w-[600px] items-center gap-1.5">
                      <Label htmlFor="mainBannerUrl">배너 링크</Label>
                      <Input
                        {...field}
                        type="text"
                        id="mainBannerUrl"
                        placeholder="배너를 클릭하면 이동할 페이지 링크를 입력해주세요."
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-row items-start justify-start space-x-5">
                  <FormField
                    control={form.control}
                    name="main_banner_open_at"
                    render={({ field }) => (
                      <FormItem className="grid items-center gap-1.5">
                        <FormLabel>노출 시작일</FormLabel>
                        <DatePickerForm field={field} />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="main_banner_close_at"
                    render={({ field }) => (
                      <FormItem className="grid items-center gap-1.5">
                        <FormLabel>노출 종료일</FormLabel>
                        <div className="flex flex-row items-center space-x-1">
                          <DatePickerForm field={field} />
                          <Button
                            variant="secondary"
                            type="button"
                            onClick={() => field.onChange("")}
                          >
                            무기한
                          </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <Button className="mt-10 self-end" type="submit">
              등록
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateMainBannerForm;
