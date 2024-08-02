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

type EventCategoryAddButtonProps = {
  className?: string;
};

const EventCategoryAddButton = ({ className }: EventCategoryAddButtonProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={className}>분야 추가</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>분야 추가</DialogTitle>
          <DialogDescription>
            추가하고 싶은 분야의 이름을 입력해주세요.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input id="name" placeholder="부트캠프, 공모전 등" />
        </div>
        <DialogFooter>
          <Button type="submit">저장하기</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EventCategoryAddButton;
