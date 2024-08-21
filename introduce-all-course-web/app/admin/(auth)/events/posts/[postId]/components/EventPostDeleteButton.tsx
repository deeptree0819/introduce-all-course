import { TrashIcon } from "lucide-react";

import { useDeleteEvent } from "@/app/hooks/admin/adminEventsHooks";
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

type EventPostDeleteButtonProps = {
  postId: number;
  variant?: "text" | "icon";
};

const EventPostDeleteButton = ({
  postId,
  variant = "text",
}: EventPostDeleteButtonProps) => {
  const { mutate: deleteEvent } = useDeleteEvent();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {variant === "text" ? (
          <Button variant="outline" className="text-red-600 hover:text-red-600">
            공고소개글 삭제
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            className="text-red-600 hover:text-red-600"
          >
            <TrashIcon size={20} />
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent className="rounded-lg">
        <AlertDialogHeader className="items-start">
          <AlertDialogTitle>게시글를 삭제하시겠습니까?</AlertDialogTitle>
          <AlertDialogDescription>
            {`${postId}번 게시글을 삭제합니다. 삭제하신 이후에는 되돌릴 수 없습니다.`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-row items-center justify-end space-x-3">
          <AlertDialogCancel className="mt-0">취소</AlertDialogCancel>
          <AlertDialogAction onClick={() => deleteEvent(postId)}>
            삭제하기
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EventPostDeleteButton;
