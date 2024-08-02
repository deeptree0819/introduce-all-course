import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type FreeLectureTagAddButtonProps = {
  className?: string;
};

const FreeLectureTagAddButton = ({
  className,
}: FreeLectureTagAddButtonProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={className}>태그 추가</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>태그 추가</DialogTitle>
          <DialogDescription>
            추가하고 싶은 태그를 입력해주세요.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input id="name" placeholder="인공지능, 인턴 등" />
        </div>
        <DialogFooter>
          <Button type="submit">저장하기</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FreeLectureTagAddButton;
