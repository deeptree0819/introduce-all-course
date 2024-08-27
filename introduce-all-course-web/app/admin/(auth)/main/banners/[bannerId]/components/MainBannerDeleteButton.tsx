import { TrashIcon } from "lucide-react";

import { useDeleteMainBanner } from "@/app/hooks/admin/adminMainBannersHooks";
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

type MainBannerDeleteButtonProps = {
  bannerId: number;
  variant?: "text" | "icon";
};

const MainBannerDeleteButton = ({
  bannerId,
  variant = "text",
}: MainBannerDeleteButtonProps) => {
  const { mutate: deleteMainBanner } = useDeleteMainBanner();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {variant === "text" ? (
          <Button variant="outline" className="text-red-600 hover:text-red-600">
            배너 삭제
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
            {`${bannerId}번 게시글을 삭제합니다. 삭제하신 이후에는 되돌릴 수 없습니다.`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-row items-center justify-end space-x-3">
          <AlertDialogCancel className="mt-0">취소</AlertDialogCancel>
          <AlertDialogAction onClick={() => deleteMainBanner(bannerId)}>
            삭제하기
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default MainBannerDeleteButton;
