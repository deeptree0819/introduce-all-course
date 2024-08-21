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
import { CreateEventCategoryDto } from "@generated/index";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { useCreateEventCategory } from "@/app/hooks/admin/adminEventsHooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { CreateEventCategorySchema } from "../schema";

type EventCategoryAddButtonProps = {
  className?: string;
};

const EventCategoryAddButton = ({ className }: EventCategoryAddButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<CreateEventCategoryDto>({
    mode: "onSubmit",
    resolver: zodResolver(CreateEventCategorySchema),
  });
  const { handleSubmit } = form;
  const { mutate: createEventCategory } = useCreateEventCategory(() =>
    setIsOpen(false)
  );

  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild>
        <Button className={className} onClick={() => setIsOpen(true)}>
          분야 추가
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>분야 추가</DialogTitle>
          <DialogDescription>
            추가하고 싶은 분야의 이름을 입력해주세요.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit((data) => createEventCategory(data))}>
            <FormField
              control={form.control}
              name="event_category_name"
              render={({ field }) => (
                <FormItem className="grid py-4">
                  <Input
                    {...field}
                    id="name"
                    placeholder="부트캠프, 공모전 등"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit">저장하기</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EventCategoryAddButton;
