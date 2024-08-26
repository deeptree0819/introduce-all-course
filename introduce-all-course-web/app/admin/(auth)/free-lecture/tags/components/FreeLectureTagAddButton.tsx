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
import { AdminCreateFreeLectureTagDto } from "@generated/index";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { useCreateFreeLectureTag } from "@/app/hooks/admin/adminFreeLectureHooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { CreateFreeLectureTagSchema } from "../schema";

type FreeLectureTagAddButtonProps = {
  className?: string;
};

const FreeLectureTagAddButton = ({
  className,
}: FreeLectureTagAddButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<AdminCreateFreeLectureTagDto>({
    mode: "onSubmit",
    resolver: zodResolver(CreateFreeLectureTagSchema),
  });
  const { handleSubmit } = form;
  const { mutate: createFreeLectureTag } = useCreateFreeLectureTag(() =>
    setIsOpen(false)
  );

  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild>
        <Button className={className} onClick={() => setIsOpen(true)}>
          태그 추가
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>태그 추가</DialogTitle>
          <DialogDescription>
            추가하고 싶은 태그를 입력해주세요.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit((data) => createFreeLectureTag(data))}>
            <FormField
              control={form.control}
              name="free_lecture_tag_name"
              render={({ field }) => (
                <FormItem className="grid py-4">
                  <Input {...field} id="name" placeholder="인공지능, 인턴 등" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="flex flex-row space-x-3">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setIsOpen(false)}
                className="w-full"
              >
                취소
              </Button>
              <Button type="submit" className="w-full">
                저장하기
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default FreeLectureTagAddButton;
