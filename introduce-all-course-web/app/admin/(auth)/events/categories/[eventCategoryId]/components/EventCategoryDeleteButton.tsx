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

type EventCategoryDeleteButtonProps = {
  eventCategoryName: string;
};

const EventCategoryDeleteButton = ({
  eventCategoryName,
}: EventCategoryDeleteButtonProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="text-red-600 hover:text-red-600">
          공고분야 삭제
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="rounded-lg">
        <AlertDialogHeader className="items-start">
          <AlertDialogTitle>공고분야를 삭제하시겠습니까?</AlertDialogTitle>
          <AlertDialogDescription>
            {`${eventCategoryName} 카테고리를 삭제합니다. 삭제하신 이후에는 되돌릴 수 없습니다.`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-row items-center justify-end space-x-3">
          <AlertDialogCancel className="mt-0">취소</AlertDialogCancel>
          <AlertDialogAction>삭제하기</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EventCategoryDeleteButton;
