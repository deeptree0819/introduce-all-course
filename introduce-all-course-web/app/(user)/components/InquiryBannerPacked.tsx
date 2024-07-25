import { cn } from "@utils/common";
import Link from "next/link";

import InquiryBanner from "./InquiryBanner";

type InquiryBannerPackedProps = {
  className?: string;
};

const InquiryBannerPacked = ({ className }: InquiryBannerPackedProps) => {
  return (
    <div
      className={cn(
        "sticky top-24 mt-32 hidden min-w-fit flex-col space-y-7 rounded-2xl border border-slate-300 p-6 desktop:ml-7 desktop:flex",
        className
      )}
    >
      <div className="flex flex-row items-center justify-between">
        <div className="text-xl font-semibold text-slate-900">취업상담</div>
        <Link href="/inquiry" className="text-sm">
          {"자세히보기 >"}
        </Link>
      </div>
      <InquiryBanner />
    </div>
  );
};

export default InquiryBannerPacked;
