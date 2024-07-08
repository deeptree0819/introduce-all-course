import { ApiError as AdminApiError } from "@generated/admin/core/ApiError";
import { ApiError } from "@generated/front/core/ApiError";
import { CheckCircle2, XCircle } from "lucide-react";
import { toast } from "react-toastify";

export function toastError(msg: string) {
  toast.error(msg, {
    icon: <XCircle className="fill-[#EB5757] text-white" />,
    className: "bg-[#FAF2F2] p-4 m-5 rounded-lg",
    bodyClassName: "text-[#EB5757] text-sm p-0 m-0",
    bodyStyle: { wordBreak: "keep-all" },
    closeButton: () => <></>,
  });
}

export function toastApiError(e: ApiError | AdminApiError, msg: string) {
  toastError(e.body?.message || msg);
}

export function toastSuccess(msg: string) {
  toast.success(msg, {
    icon: <CheckCircle2 className="text-[#31C48D]" />,
    className: "bg-[#F3FAF7] p-4 m-5 text-sm rounded-lg",
    bodyStyle: { wordBreak: "keep-all" },
    closeButton: () => <></>,
  });
}

export function toastInfo(msg: string) {
  toast.info(msg, {
    icon: <CheckCircle2 className="text-blue-600" />,
    className: "bg-[#F0F6FE] p-4 m-5 rounded-lg",
    bodyClassName: "text-[#2F80ED] text-sm p-0 m-0",
    bodyStyle: { wordBreak: "keep-all" },
    closeButton: () => <></>,
  });
}
