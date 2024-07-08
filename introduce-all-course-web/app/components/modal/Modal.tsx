"use client";

import NewLineText from "@components/common/NewLineText";
import { Button } from "@components/ui/button";
import { DialogContent } from "@components/ui/dialog";
import { Dialog } from "@radix-ui/react-dialog";

import { useModalStore } from "@/app/store/modalStore";

const Modal = () => {
  const open = useModalStore((state) => state.open);
  const state = useModalStore((state) => state.state);
  const {
    title,
    bodyText,
    primaryButtonText,
    primaryClick,
    secondaryButtonText,
    secondaryClick,
    onClose,
  } = state;

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        useModalStore.setState({ open });
      }}
    >
      <DialogContent>
        <div className="flex items-center justify-center">
          <h3
            className="text-center text-[20px] font-semibold"
            style={{
              wordBreak: "keep-all",
            }}
          >
            {title}
          </h3>
        </div>
        <NewLineText
          className="mt-1 whitespace-pre-wrap text-center text-[14px] text-gray-600"
          text={bodyText || ""}
        />

        <div className="mt-3 flex w-full flex-col space-y-3">
          <Button
            onClick={() => {
              primaryClick && primaryClick();
              useModalStore.setState({ open: false });
            }}
          >
            {primaryButtonText}
          </Button>
          {secondaryButtonText && (
            <Button
              onClick={() => {
                secondaryClick?.();
                useModalStore.setState({ open: false });
              }}
              variant={"outline"}
            >
              {secondaryButtonText}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;

export function useModal() {
  const setState = useModalStore.setState;
  const deleteProfileModal = (onDelete: () => void) =>
    setState({
      open: true,
      state: {
        title: `탈퇴하기`,
        bodyText: `탈퇴하시겠습니까?\n탈퇴 후에는 계정을 복구할 수 없습니다.`,
        primaryButtonText: "탈퇴하기",
        primaryClick: () => {
          onDelete();
        },
        secondaryButtonText: "취소하기",
      },
    });

  return {
    deleteProfileModal,
  };
}
