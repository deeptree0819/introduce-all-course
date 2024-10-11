"use client";

import { Button } from "@components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";

import { useDeleteMe } from "@/app/hooks/user/userHooks";

const DeleteAccountButton = () => {
  const { mutate: deleteMe } = useDeleteMe();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="px-1 text-red-500">
          회원 탈퇴
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px]">
        <DialogHeader>
          <DialogTitle>회원 탈퇴</DialogTitle>
          <DialogDescription>
            탈퇴하시면 모든 정보가 삭제되며, 복구할 수 없습니다.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="destructive" onClick={() => deleteMe()}>
            탈퇴하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAccountButton;
