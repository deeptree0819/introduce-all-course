import { useParams } from "next/navigation";

import {
  useDeleteFreeLectureTag,
  useGetFreeLectureTagById,
} from "@/app/hooks/admin/adminFreeLectureHooks";
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

const FreeLectureTagDeleteButton = ({}) => {
  const params = useParams<{ freeLectureTagId: string }>();
  const freeLectureTagId = +params.freeLectureTagId;

  const { data: freeLectureTag } = useGetFreeLectureTagById(freeLectureTagId);

  const { mutate: deleteFreeLectureTag } =
    useDeleteFreeLectureTag(freeLectureTagId);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="text-red-600 hover:text-red-600">
          태그 삭제
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="rounded-lg">
        <AlertDialogHeader className="items-start">
          <AlertDialogTitle>{`${freeLectureTag?.free_lecture_tag_name} 태그를 삭제하시겠습니까?`}</AlertDialogTitle>
          <AlertDialogDescription>
            {`${freeLectureTag?.free_lecture_tag_name} 태그를 삭제합니다. 삭제하신 이후에는 되돌릴 수 없습니다.`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-row items-center justify-end space-x-3">
          <AlertDialogCancel className="mt-0">취소</AlertDialogCancel>
          <AlertDialogAction onClick={() => deleteFreeLectureTag()}>
            삭제하기
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default FreeLectureTagDeleteButton;
