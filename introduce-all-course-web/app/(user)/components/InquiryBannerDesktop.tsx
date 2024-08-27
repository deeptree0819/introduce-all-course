"use client";

import BoyImage from "@assets/inquiryBannerBoy.png";
import GirlImage from "@assets/inquiryBannerGirl.png";
import PointingUpImage from "@assets/pointingUp.png";
import { cn } from "@utils/common";
import Image from "next/image";
import Link from "next/link";

import { useGetLatestInquiryFormLink } from "@/app/hooks/user/inquiryHooks";

type InquiryBannerDesktopProps = {
  className?: string;
};

const InquiryBannerDesktop = ({ className }: InquiryBannerDesktopProps) => {
  const { data: inquiryFormLink } = useGetLatestInquiryFormLink();

  return (
    <section
      className={cn(
        "flex flex-row items-center justify-between space-x-24",
        className
      )}
    >
      <div className="flex flex-col items-start">
        <h3 className="flex flex-col items-start">
          <span className="block text-xl font-normal text-slate-600">
            A부터 Z까지
          </span>
          <span className="block text-2xl">
            <span className="font-semibold ">로봇AI 교육 전문가에게</span>{" "}
            물어봐 🎤
          </span>
        </h3>

        <div className="mt-8 flex flex-col space-y-4">
          <div className="flex flex-row items-center space-x-3">
            <div className="flex flex-col items-center">
              <Image src={BoyImage} alt="취업준비생" className="w-20" />
              <div className="whitespace-pre text-base font-semibold text-slate-600">
                취업준비생
              </div>
            </div>
            <div className="speech-bubble-right whitespace-pre break-keep rounded-2xl bg-[#EDF6FF] p-5 text-base font-semibold text-slate-500">
              <span className="text-slate-900">부산</span>에서 취업 준비 중인
              20대 후반 남성입니다.{" "}
              <span className="text-slate-900">로봇과 AI 분야</span>
              <br />에 관심이 있는데 어디부터 준비해야할지 모르겠어요ㅠㅠ
            </div>
          </div>

          <div className="flex flex-row items-center space-x-3">
            <div className="speech-bubble-left break-keep rounded-2xl bg-[#EDF6FF] p-5 text-base font-semibold text-slate-500 laptop:whitespace-pre-line desktop:whitespace-pre">
              <span className="text-[#0085FF]">
                질문자분께 꼭 맞는 고퀄리티 교육 추천, 선호 직무
              </span>
              에 대한
              <br />
              <span className="text-[#2C67FF]">디테일한 설명</span>{" "}
              도와드리겠습니다! :)
            </div>
            <div className="flex flex-col items-center">
              <Image src={GirlImage} alt="로봇 AI 전문가" className="w-20" />
              <div className="whitespace-pre text-base font-semibold text-slate-600">
                로봇 AI 전문가
              </div>
            </div>
          </div>
        </div>

        {inquiryFormLink ? (
          <Link
            href={inquiryFormLink}
            className="mt-6 rounded-full bg-brand px-14 py-5 text-lg font-semibold text-white shadow-md shadow-slate-200 hover:bg-[hsl(209,100%,54%)]"
            target="_blank"
          >
            무료상담 신청하기
          </Link>
        ) : (
          <div className="mt-6 rounded-full bg-brand px-14 py-5 text-lg font-semibold text-white shadow-md shadow-slate-200 hover:bg-[hsl(209,100%,54%)]">
            무료상담 신청하기
          </div>
        )}
      </div>

      <div className="mt-20 w-full min-w-[200px] max-w-sm">
        <Image src={PointingUpImage} alt="일러스트" />
      </div>
    </section>
  );
};

export default InquiryBannerDesktop;
