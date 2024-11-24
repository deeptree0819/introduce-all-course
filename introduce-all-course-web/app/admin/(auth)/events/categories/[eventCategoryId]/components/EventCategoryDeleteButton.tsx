import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@components/ui/form";
import { DeleteEventCategoryDto } from "@generated/index";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import {
  useDeleteEventCategory,
  useGetAllEventCategoriesWithPagination,
  useGetEventCategoryById,
  useGetEventCategoryPostCount,
} from "@/app/hooks/admin/adminEventsHooks";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { DeleteEventCategorySchema } from "../schema";

type EventCategoryDeleteButtonProps = {
  eventCategoryId: number;
};

const EventCategoryDeleteButton = ({
  eventCategoryId,
}: EventCategoryDeleteButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const { data: eventCategory } = useGetEventCategoryById(eventCategoryId);
  const categoryName = eventCategory?.event_category_name || "";

  const { mutate: deleteEventCategory } =
    useDeleteEventCategory(eventCategoryId);

  const form = useForm<DeleteEventCategoryDto>({
    mode: "onSubmit",
    resolver: zodResolver(DeleteEventCategorySchema),
  });
  const { handleSubmit } = form;

  const { data: eventCategories } = useGetAllEventCategoriesWithPagination({
    page: 1,
    itemsPerPage: 50,
  });

  const { data: postCount } = useGetEventCategoryPostCount(eventCategoryId);

  useEffect(() => {
    if (postCount === 0) {
      form.setValue("move_category_id", 0);
    }
  }, [form, postCount]);

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="text-red-600 hover:text-red-600"
          onClick={() => setIsOpen(true)}
        >
          커리큘럼 삭제
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="rounded-lg">
        <Form {...form}>
          <form
            onSubmit={handleSubmit((data) => deleteEventCategory(data))}
            className="space-y-5"
          >
            <AlertDialogHeader className="items-start">
              <AlertDialogTitle>커리큘럼를 삭제하시겠습니까?</AlertDialogTitle>
              <AlertDialogDescription>
                {`${categoryName} 카테고리를 삭제합니다. 삭제하신 이후에는 되돌릴 수 없습니다.`}
              </AlertDialogDescription>
            </AlertDialogHeader>

            <FormField
              control={form.control}
              name="move_category_id"
              render={({ field }) => (
                <FormItem className="flex flex-col space-y-1.5">
                  <Label>{`${categoryName} 카테고리에 해당하는 게시글을 옮길 카테고리를 선택해주세요.`}</Label>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="w-56">
                        <SelectValue placeholder="커리큘럼를 선택해주세요." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {eventCategories?.items
                        .filter(
                          (category) =>
                            category.event_categories_id !== eventCategoryId
                        )
                        .map((category) => (
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

            <AlertDialogFooter className="flex flex-row items-center justify-end space-x-3">
              <AlertDialogCancel
                className="mt-0"
                onClick={() => setIsOpen(false)}
              >
                취소
              </AlertDialogCancel>
              <AlertDialogAction type="submit">삭제하기</AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EventCategoryDeleteButton;
