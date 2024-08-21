"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import { Form, FormField, FormItem, FormMessage } from "@components/ui/form";
import { CreateInquiryFormLinkDto } from "@generated/index";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import {
  useCreateInquiryFormLink,
  useGetLatestInquiryFormLink,
} from "@/app/hooks/admin/adminInquiryHooks";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { CreateInquiryFormLinkSchema } from "../schema";

type FormLinkAddInputFieldProps = {
  className?: string;
};

const FormLinkAddInputField = ({ className }: FormLinkAddInputFieldProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<CreateInquiryFormLinkDto>();

  const { data: currentInquiryFormLink } = useGetLatestInquiryFormLink();

  const form = useForm<CreateInquiryFormLinkDto>({
    mode: "onSubmit",
    resolver: zodResolver(CreateInquiryFormLinkSchema),
  });
  const { handleSubmit } = form;
  const { mutate: createInquiryFormLink } = useCreateInquiryFormLink(() =>
    setIsOpen(false)
  );

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit((data) => {
          setData(data);
          setIsOpen(true);
        })}
        className="flex w-full max-w-lg flex-row items-start space-x-2"
      >
        <FormField
          control={form.control}
          name="inquiry_form_links_url"
          render={({ field }) => (
            <FormItem className="grid w-full">
              <Input
                {...field}
                id="name"
                placeholder="상담신청 버튼을 누르면 이동할 링크를 입력하세요."
                defaultValue={currentInquiryFormLink}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <Dialog open={isOpen}>
          <DialogTrigger asChild>
            <Button className={className} type="submit">
              링크 변경
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle>상담신청 링크 변경</DialogTitle>
              <DialogDescription className="text-base">
                {data ? data.inquiry_form_links_url : ""}
              </DialogDescription>
            </DialogHeader>

            <DialogFooter className="flex w-full flex-row justify-center space-x-2">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setIsOpen(false)}
                >
                  취소
                </Button>
              </DialogClose>
              <Button
                type="button"
                onClick={() => data && createInquiryFormLink(data)}
              >
                저장하기
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </form>
    </Form>
  );
};

export default FormLinkAddInputField;
