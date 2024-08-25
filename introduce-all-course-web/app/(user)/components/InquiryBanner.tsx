"use client";

import BoyImage from "@assets/inquiryBannerBoy.png";
import GirlImage from "@assets/inquiryBannerGirl.png";
import PointingUpImage from "@assets/pointingUp.png";
import { cn } from "@utils/common";
import Image from "next/image";
import Link from "next/link";

type InquiryBannerProps = {
  className?: string;
};

const InquiryBanner = ({ className }: InquiryBannerProps) => {
  return (
    <aside
      className={cn(
        "flex flex-col items-center px-7 desktop:max-w-[280px]",
        className
      )}
    >
      <h3 className="flex flex-col items-center">
        <span className="block text-xl font-normal text-slate-600 desktop:text-lg">
          A부터 Z까지
        </span>
        <span className="block text-2xl font-semibold desktop:text-xl">
          로봇AI 교육 전문가에게
        </span>
        <span className="block text-2xl font-semibold desktop:text-xl">
          물어봐 🎤
        </span>
      </h3>

      <div className="mt-6 flex flex-col space-y-4">
        <div className="flex flex-row items-center space-x-3">
          <div className="flex flex-col items-center">
            <Image src={BoyImage} alt="취업준비생" className="w-11" />
            <div className="whitespace-pre text-xs font-semibold">
              취업준비생
            </div>
          </div>
          <div className="speech-bubble-right whitespace-pre-line break-keep rounded-xl bg-[#EDF6FF] p-3.5 text-xs font-semibold text-slate-500">
            <span className="text-slate-900">부산</span>에서 취업 준비 중인 20대
            후반 남성입니다.
            <br /> <span className="text-slate-900">로봇과 AI 분야</span>에
            관심이 있는데 어디부터 준비해야 할지 모르겠어요ㅠㅠ
          </div>
        </div>

        <div className="flex flex-row items-center space-x-3">
          <div className="speech-bubble-left whitespace-pre-line break-keep rounded-xl bg-[#EDF6FF] p-3.5 text-xs font-semibold text-slate-500">
            <span className="text-[#0085FF]">
              질문자분께 꼭 맞는 고퀄리티 교육 추천,선호 직무
            </span>
            에 대한 <span className="text-[#2C67FF]">디테일한 설명</span>{" "}
            도와드리겠습니다! :)
          </div>
          <div className="flex flex-col items-center whitespace-pre">
            <Image src={GirlImage} alt="로봇 AI 전문가" className="w-11" />
            <div className="text-xs font-semibold">로봇 AI 전문가</div>
          </div>
        </div>
      </div>

      <Link
        href="https://tally.so"
        className="mt-5 rounded-full bg-brand px-8 py-3 text-lg font-semibold text-white shadow-lg shadow-slate-200"
        target="_blank"
      >
        무료상담 신청하기
      </Link>

      <Image
        src={PointingUpImage}
        alt="일러스트"
        className="mt-4 w-[213px] desktop:w-[150px]"
      />
    </aside>
  );
};

export default InquiryBanner;
