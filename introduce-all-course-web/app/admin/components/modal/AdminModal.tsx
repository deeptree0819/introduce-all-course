"use client";

import NewLineText from "@components/common/NewLineText";

import { useAdminModalStore } from "@/app/store/adminModalStore";

import { AdminButton } from "../ui/admin-button";
import { AdminDialog, AdminDialogContent } from "../ui/admin-dialog";

const AdminModal = () => {
  const open = useAdminModalStore((state) => state.open);
  const state = useAdminModalStore((state) => state.state);
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
    <AdminDialog
      open={open}
      onOpenChange={(open) => {
        useAdminModalStore.setState({ open });
      }}
    >
      <AdminDialogContent>
        <div className="flex items-center">
          <h3
            className="text-[20px] font-semibold"
            style={{
              wordBreak: "keep-all",
            }}
          >
            {title}
          </h3>
        </div>
        <NewLineText
          className="mt-1 whitespace-pre-wrap text-[14px] text-gray-600"
          text={bodyText || ""}
        />

        <div className="mt-3 flex w-full flex-col space-y-3">
          <AdminButton
            onClick={() => {
              primaryClick && primaryClick();
              useAdminModalStore.setState({ open: false });
            }}
          >
            {primaryButtonText}
          </AdminButton>
          {secondaryButtonText && (
            <AdminButton
              onClick={() => {
                secondaryClick?.();
                useAdminModalStore.setState({ open: false });
              }}
              variant={"outline"}
            >
              {secondaryButtonText}
            </AdminButton>
          )}
        </div>
      </AdminDialogContent>
    </AdminDialog>
  );
};

export default AdminModal;

export function useAdminModal() {
  const setState = useAdminModalStore.setState;
  const sendFindPasswordEmailModal = () =>
    setState({
      open: true,
      state: {
        title: `메일 발송 완료`,
        bodyText: `입력하신 메일로 비밀번호 재설정 메일을 발송하였습니다.\n이메일이 오지 않으면, 스팸메일함을 확인해 주시거나, 관리자에게 문의주세요.`,
        primaryButtonText: "확인",
        primaryClick: () => {},
      },
    });
  return {
    sendFindPasswordEmailModal,
  };
}
