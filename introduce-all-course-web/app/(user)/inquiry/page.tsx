"use client";

import BoyImage from "@assets/inquiryBannerBoy.png";
import GirlImage from "@assets/inquiryBannerGirl.png";
import InquiryBg from "@assets/inquirybg.svg";
import picture1 from "@assets/inquirypicture1.png";
import picture1_mobile from "@assets/inquirypicture1_mobile.png";
import picture2 from "@assets/inquirypicture2.png";
import picture2_mobile from "@assets/inquirypicture2_mobile.png";
import picture3 from "@assets/inquirypicture3.png";
import picture3_mobile from "@assets/inquirypicture3_mobile.png";
import rocket from "@assets/inquiryrocket.png";
import PointingUpImage from "@assets/pointingUp.png";
import profile_ceo from "@assets/profile_ceo.png";
import profile_partner from "@assets/profile_partner1.png";
import Image from "next/image";

import { useGetLatestInquiryFormLink } from "@/app/hooks/user/inquiryHooks";

const EventPage = () => {
  const { data: inquiryFormLink } = useGetLatestInquiryFormLink();

  return (
    <main>
      <section className="mx-auto flex w-full max-w-[1200px] flex-col items-center delay-150 duration-300 laptop:px-16 laptop:py-10 desktop:px-8 desktop:py-12">
        <div className="flex w-full flex-col items-center justify-between  bg-[#EDF6FF] delay-150 duration-300 laptop:flex-row laptop:items-start laptop:rounded-3xl laptop:py-10 laptop:pl-20 laptop:pr-7 desktop:py-20 desktop:pl-36 desktop:pr-20">
          <div className="flex flex-col items-center laptop:items-start laptop:space-y-1 desktop:space-y-2">
            <div className="pt-10 text-base font-light text-slate-600 delay-150  duration-300 laptop:pt-7 laptop:text-2xl desktop:text-3xl ">
              A부터 Z까지{" "}
            </div>
            <div className="text-center text-3xl font-semibold text-[#0085FF] delay-150  duration-300 laptop:text-left laptop:text-4xl desktop:text-5xl">
              로봇AI 교육전문가에게 <br />
            </div>
            <div className="text-3xl text-[#000000] delay-150 duration-300 before:font-semibold laptop:text-4xl desktop:text-5xl ">
              물어봐!
            </div>
            <div className="pt-6 text-sm font-medium text-[#000000]  laptop:text-base desktop:text-xl">
              로봇AI 전문 상담이 무료라고?{" "}
              <span className="text-xs font-light laptop:text-xs desktop:text-sm">
                *신규가입자 대상
              </span>
            </div>
            <div className="pt-10">
              <a
                href={inquiryFormLink}
                className="rounded-full bg-brand px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-slate-300 delay-150 duration-300 hover:bg-[hsl(209,100%,54%)] laptop:px-10 laptop:py-4 laptop:text-base desktop:px-14 desktop:py-5 desktop:text-lg"
                target="_blank"
              >
                무료상담 신청하기
              </a>
            </div>
          </div>
          <div className="mx-auto mt-6 w-full  min-w-0 max-w-[230px] pb-10 delay-150 duration-300 laptop:mx-0 laptop:max-w-[280px] desktop:max-w-[330px]">
            <Image src={PointingUpImage} alt="일러스트" />
          </div>
        </div>
      </section>

      <section className="relative flex flex-col bg-[#2295FF] laptop:pb-0">
        <div className="absolute inset-0 z-0 h-full w-full">
          <InquiryBg
            preserveAspectRatio="xMidYMid slice"
            className="h-full w-full"
          />
        </div>
        <div className="relative mx-auto flex w-full max-w-[1300px] flex-col items-center justify-between px-10 py-5 laptop:flex-row laptop:px-32 laptop:py-10">
          <div>
            <h1 className="pb-3 text-center text-xl  font-semibold text-white shadow-slate-800 drop-shadow-md laptop:pb-4 laptop:text-left laptop:text-2xl desktop:pb-5 desktop:text-3xl ">
              {`모두 "로봇다이브"에서 해결하자!`}
            </h1>

            <div
              className="mx-auto flex flex-wrap justify-center space-x-2 laptop:justify-normal laptop:space-x-4 
            laptop:px-0 desktop:space-x-4"
            >
              <div
                className="space-x-2 space-y-2 laptop:space-x-3 
              laptop:space-y-4 desktop:space-x-4 desktop:space-y-6"
              >
                {["💼 취업", "🤔 이직", "📚 교육"].map((text, index) => (
                  <button
                    key={index}
                    className="shrink-0 rounded-sm bg-white px-5 py-2 text-xs font-medium text-gray-700 shadow-md shadow-slate-500 hover:bg-brand-secondary hover:shadow-sm laptop:text-sm desktop:text-lg"
                  >
                    {text}
                  </button>
                ))}
              </div>
              <div
                className="space-x-2 space-y-2 pb-2 
              laptop:space-x-4 laptop:space-y-4 desktop:space-x-4 desktop:space-y-6"
              >
                {["🧐 전공고민", "🤝 직원채용"].map((text, index) => (
                  <button
                    key={index}
                    className="shrink rounded-sm bg-white px-5 py-2 text-xs  font-medium text-gray-700 shadow-md shadow-slate-500 hover:bg-brand-secondary hover:shadow-sm laptop:text-sm desktop:text-lg"
                  >
                    {text}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="min-w-0 max-w-[100px] pt-5 laptop:max-w-[120px] laptop:pl-2 laptop:pt-0 desktop:max-w-[150px]">
            <Image src={rocket} alt="로켓" />
          </div>
        </div>
      </section>

      <svg
        className="mx-auto mt-7 h-8 w-8 animate-bounce laptop:mt-8 laptop:h-12 laptop:w-12 desktop:mt-20"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="#0085FF"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1 laptop:2"
          d="M19 9l-7 7-7-7"
        />
      </svg>

      <section
        className="mx-auto flex w-full flex-col items-center space-y-3 pt-10
      delay-150 duration-300 laptop:pt-16 desktop:pt-20"
      >
        <h1 className="text-center text-base font-semibold text-[#0085FF] delay-150 duration-300 laptop:text-xl desktop:text-2xl">
          무료컨설팅
        </h1>
        <h1 className="text-center text-2xl font-semibold text-black delay-150 duration-300 laptop:text-3xl desktop:text-4xl">
          국가연구소 출신 전문가와 <br /> 함께 고민하세요!
        </h1>
        <h2 className="break-keep px-20 text-center text-xs font-light text-gray-600 delay-150 duration-300 laptop:text-sm desktop:text-base">
          회사추천 / 직무소개 / 부트캠프 / 국비교육 / 이력서첨삭 / 자녀교육 /
          대학전공 / 직원채용 / 자기계발 / 프로젝트 / 진로상담
        </h2>
      </section>

      <section className="mx-auto flex w-full max-w-[1200px] flex-col items-center px-5 py-8 delay-150 duration-300 laptop:px-8 laptop:py-10 desktop:py-14">
        <div className="flex w-full max-w-[1200px]  flex-col  justify-between rounded-3xl bg-[#EDF6FF] p-5 shadow-[0px_0px_20px_-15px_rgba(0,0,0,0.3)] delay-150 duration-300 laptop:flex-col laptop:items-start laptop:p-12 desktop:p-16">
          <div
            className="pb-4 text-base font-semibold text-gray-800 delay-150 duration-300 laptop:pb-7 
          laptop:text-2xl desktop:absolute desktop:pb-0 desktop:text-3xl"
          >
            선호 직무 준비부터
            <br />
            취업지원 컨설팅까지
          </div>
          <div className="mx-auto flex w-full flex-row items-center justify-center space-x-3 pb-2 tablet:justify-start laptop:pb-3 desktop:justify-end desktop:pt-10">
            <div className="flex flex-col items-center">
              <Image
                src={BoyImage}
                alt="취업준비생"
                className="w-10 laptop:w-16 desktop:w-20"
              />
              <div className="whitespace-pre text-xs font-semibold text-slate-600 laptop:text-base">
                취업준비생
              </div>
            </div>
            <div
              className="speech-bubble-right-white break-keep rounded-2xl bg-white p-3 text-xs font-semibold text-slate-500 laptop:whitespace-pre-line laptop:p-4 laptop:text-sm
            desktop:whitespace-pre desktop:p-5 desktop:text-base"
            >
              <span className="text-slate-900">부산</span>에서 취업 준비 중인
              20대 후반 남성입니다.{" "}
              <span className="text-slate-900">로봇과 AI 분야</span>
              <br className="hidden tablet:inline laptop:inline desktop:inline" />
              에 관심이 있는데 어디부터 준비해야할지 모르겠어요ㅠㅠ
            </div>
          </div>

          <div
            className="mx-auto flex w-full flex-row items-center justify-center space-x-3 tablet:justify-end
            laptop:justify-end "
          >
            <div
              className="speech-bubble-left-white break-keep rounded-2xl bg-white p-3 text-xs font-semibold text-slate-500 laptop:whitespace-pre-line
            laptop:p-4  laptop:text-sm desktop:whitespace-pre desktop:p-5 desktop:text-base"
            >
              <span className="text-[#0085FF]">
                질문자분께 꼭 맞는 고퀄리티 교육 추천, 선호 직무
              </span>
              에 대한
              <br className="hidden tablet:inline laptop:inline desktop:inline" />
              <span className="hidden text-[#2C67FF] laptop:inline desktop:inline">
                디테일한 설명
              </span>
              <span className="inline text-[#2C67FF] laptop:hidden desktop:hidden">
                {" "}
                디테일한 설명
              </span>{" "}
              도와드리겠습니다! :)
            </div>
            <div className="flex flex-col items-center">
              <Image
                src={GirlImage}
                alt="로봇 AI 전문가"
                className="w-10 laptop:w-16 desktop:w-20"
              />
              <div className="whitespace-pre text-xs font-semibold text-slate-600 laptop:text-base">
                로봇 AI 전문가
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="mx-auto flex w-full flex-col items-center
      space-y-3 pt-14 laptop:pt-16 desktop:pt-24"
      >
        <h1 className="text-center text-base font-semibold text-[#0085FF] laptop:text-xl desktop:text-2xl">
          커리어 고민이 있나요?
        </h1>
        <h1 className="text-center text-2xl font-semibold text-black laptop:text-3xl desktop:text-4xl">
          취업진로에 대한 고민 <br className="inline laptop:hidden" />
          효율적으로 해야죠!
        </h1>
        <h2 className="break-keep px-20 text-center text-xs font-light text-gray-600 laptop:text-sm desktop:text-base">
          자율주행 / 산업용로봇 / 협동로봇 / 서비스로봇 / IoT / 딥러닝 /
          머신러닝 / LLM
        </h2>
      </section>

      <section className="mx-auto flex w-full max-w-[1200px] flex-col items-center px-5 py-8 laptop:px-20 laptop:py-10 desktop:px-20 desktop:py-14">
        <div className="destkop:py-16 relative flex  w-full max-w-[400px] flex-col-reverse items-center justify-between rounded-3xl  bg-[#EDF6FF] py-8 shadow-[0px_0px_20px_-15px_rgba(0,0,0,0.3)] laptop:max-w-[1200px] laptop:flex-row laptop:rounded-3xl laptop:px-10 laptop:py-12 desktop:px-16 ">
          <div className="mx-auto w-full items-start px-8 laptop:px-0 ">
            <button className="mt-6 flex flex-col rounded-full bg-brand px-5 py-1 text-sm font-semibold text-white shadow-md shadow-slate-300 hover:bg-[hsl(209,100%,54%)] laptop:mt-0 laptop:px-6 laptop:py-2 laptop:text-base desktop:px-8 desktop:py-2 desktop:text-lg">
              🙋‍♂️ 교육
            </button>
            <div
              className="mx-auto w-full break-keep pt-2 text-base font-normal text-gray-700 laptop:pt-2
          laptop:text-lg desktop:pt-4 desktop:text-xl"
            >
              <span className="font-semibold">
                제조업 1등공신인 <br className="hidden laptop:inline" />
                산업용로봇
              </span>
              을<br />
              배우고 싶은데..
              <br />
              어디서 배우면 좋나요?
            </div>
          </div>
          <div className="absolute mx-auto hidden w-full max-w-[400px] items-center laptop:relative laptop:-my-12 laptop:-mr-10 laptop:inline laptop:w-auto  laptop:max-w-[400px] desktop:-my-12 desktop:-mr-16 desktop:max-w-[500px]">
            <Image
              src={picture1}
              style={{ objectFit: "cover" }}
              alt="picture1"
            />
          </div>
          <div className="-mx-20 -mt-8 w-full max-w-[400px] laptop:hidden ">
            <Image
              src={picture1_mobile}
              style={{ objectFit: "cover" }}
              alt="picture1_mobile"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-[1200px] flex-col items-center px-5 py-0 laptop:px-20 laptop:py-0 desktop:px-20 desktop:py-0">
        <div className="destkop:py-16 relative flex  w-full max-w-[400px] flex-col-reverse items-center justify-between rounded-3xl  bg-[#D6EAFF] py-8 shadow-[0px_0px_20px_-15px_rgba(0,0,0,0.3)] laptop:max-w-[1200px] laptop:flex-row laptop:rounded-3xl laptop:px-10 laptop:py-12 desktop:px-16 ">
          <div className="mx-auto w-full items-start px-8 laptop:px-0 ">
            <button className="mt-6 flex flex-col rounded-full bg-brand px-5 py-1 text-sm font-semibold text-white shadow-md shadow-slate-300 hover:bg-[hsl(209,100%,54%)] laptop:mt-0 laptop:px-6 laptop:py-2 laptop:text-base desktop:px-8 desktop:py-2 desktop:text-lg">
              🙋🏻️ 질문
            </button>
            <div
              className="mx-auto w-full break-keep pt-2 text-base font-normal text-gray-700 laptop:pt-2
          laptop:text-lg desktop:pt-4 desktop:text-xl"
            >
              완전 자율주행(5레벨)까지 <br className="hidden laptop:inline" />
              머지 않았는데 <br />
              <span className="font-semibold">자율주행 개발자가 되려면?</span>
            </div>
          </div>
          <div className="absolute mx-auto hidden w-full max-w-[400px] items-center laptop:relative laptop:-my-12 laptop:-mr-10 laptop:inline laptop:w-auto  laptop:max-w-[400px] desktop:-my-12 desktop:-mr-16 desktop:max-w-[500px]">
            <Image
              src={picture2}
              style={{ objectFit: "cover" }}
              alt="picture2"
            />
          </div>
          <div className="-mx-20 -mt-8 w-full max-w-[400px] laptop:hidden ">
            <Image
              src={picture2_mobile}
              style={{ objectFit: "cover" }}
              alt="picture2_mobile"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-[1200px] flex-col items-center px-5 py-8 laptop:px-20 laptop:py-10 desktop:px-20 desktop:py-14">
        <div className="destkop:py-16 relative flex  w-full max-w-[400px] flex-col-reverse items-center justify-between rounded-3xl  bg-[#B9DBFF] py-8 shadow-[0px_0px_20px_-15px_rgba(0,0,0,0.3)] laptop:max-w-[1200px] laptop:flex-row laptop:rounded-3xl laptop:px-10 laptop:py-12 desktop:px-16 ">
          <div className="mx-auto w-full items-start px-8 laptop:px-0 ">
            <button className="mt-6 flex flex-col rounded-full bg-brand px-5 py-1 text-sm font-semibold text-white shadow-md shadow-slate-300 hover:bg-[hsl(209,100%,54%)] laptop:mt-0 laptop:px-6 laptop:py-2 laptop:text-base desktop:px-8 desktop:py-2 desktop:text-lg">
              🙋🏽‍♀️️ 솔루션
            </button>
            <div
              className="mx-auto w-full break-keep pt-2 text-base font-normal text-gray-700 laptop:pt-2
          laptop:text-lg desktop:pt-4 desktop:text-xl"
            >
              <span className="font-semibold">
                인공지능과 공존하며 <br className="hidden laptop:inline" />
                살아가는 현 시대
              </span>
              에는
              <br />
              무엇을 공부해야 하나요?
            </div>
          </div>
          <div className="absolute mx-auto hidden w-full max-w-[400px] items-center laptop:relative laptop:-my-12 laptop:-mr-10 laptop:inline laptop:w-auto  laptop:max-w-[400px] desktop:-my-12 desktop:-mr-16 desktop:max-w-[500px]">
            <Image
              src={picture3}
              style={{ objectFit: "cover" }}
              alt="picture3"
            />
          </div>
          <div className="-mx-20 -mt-8 w-full max-w-[400px] laptop:hidden ">
            <Image
              src={picture3_mobile}
              style={{ objectFit: "cover" }}
              alt="picture3_mobile"
            />
          </div>
        </div>
      </section>

      <section className="bg-[#EDF6FF]">
        <div className="relative mx-auto flex w-full max-w-[440px] flex-col items-start px-5 pb-5 pt-10 laptop:max-w-[1200px] laptop:items-start laptop:px-44 laptop:pb-5 laptop:pt-14 desktop:pb-2">
          <h1 className="pb-1 text-base font-semibold text-[#0085FF] delay-150 duration-300 laptop:pb-2 laptop:text-xl desktop:text-left desktop:text-lg">
            로봇AI 전문가
          </h1>
          <h1 className="pb-5 text-left text-xl font-semibold text-black delay-150 duration-300 laptop:pb-0 laptop:text-2xl desktop:text-3xl">
            취업에 대한 커리큘럼을
            <br />
            확실히 챙길 당신의 컨설턴트예요.
          </h1>
          <hr></hr>
          <div className="relative w-full max-w-[400px] rounded-3xl bg-[#B9DBFF] shadow-[0px_0px_20px_-15px_rgba(0,0,0,0.3)] ">
            <div className="mx-auto mt-3 w-full min-w-0 max-w-[180px] laptop:hidden ">
              <Image src={profile_ceo} alt="사진" />
            </div>
          </div>
        </div>
        <div className="slaptop:flex-row slaptop:pt-0 relative mx-auto flex w-full max-w-[440px] flex-col items-start justify-between px-5 laptop:max-w-[1200px] laptop:px-44 laptop:pb-10 desktop:pt-6  ">
          <div className="mx-auto flex w-full flex-col items-start">
            <div className="h-12 border-l-2 border-[#0085FF] pb-3 pl-4 text-base font-semibold text-gray-800 laptop:h-20 laptop:border-l-4 laptop:pb-4  laptop:text-xl desktop:text-2xl ">
              <div className="laptop:mb-2 laptop:mt-1">로봇다이브</div>
              <div className="text-sm font-medium laptop:text-lg desktop:text-xl ">
                대표 컨설턴트 이력
              </div>
            </div>
            <div className="mb-10 mt-5 break-keep text-start text-sm font-light text-gray-700 laptop:mb-0 laptop:text-sm desktop:text-base">
              현) 딥트리 대표
              <br />
              현) 직업능력심사평가원 인증 NCS 확인강사
              <br />
              현) 로봇AI 교육 전문기업 전임강사
              <br />
              전) 한국로봇융합연구원 연구원
              <br />
              전) 강남구 로봇 인공지능 해커톤 멘토
              <br />
              특허 등록) 사용자와 상호작용하는 스피치 보조 로봇의 동작 방법
            </div>
          </div>
          <div className="mx-auto mt-7 hidden w-full min-w-0 max-w-[200px] delay-150 duration-300 laptop:absolute laptop:bottom-0 laptop:right-40 laptop:mx-0 laptop:inline laptop:max-w-[240px] desktop:mt-0 desktop:max-w-[280px]">
            <Image src={profile_ceo} alt="사진" />
          </div>
        </div>
      </section>

      <section className="mt-5 bg-[#F2FEFF]">
        <div className="relative mx-auto flex w-full max-w-[440px] flex-col px-5 pb-5 pt-10 laptop:max-w-[1200px] laptop:items-end laptop:px-48 laptop:pb-5 laptop:pt-14 desktop:pb-2">
          <h1 className="pb-1 text-base font-semibold text-[#22D1FF] delay-150 duration-300 laptop:pb-2 laptop:text-end laptop:text-xl desktop:text-lg">
            로봇AI 전문가
          </h1>
          <h1 className="pb-5 text-xl font-semibold text-black delay-150 duration-300 laptop:pb-0 laptop:text-end laptop:text-2xl desktop:text-3xl">
            딥트리의
            <br />
            파트너 컨설턴트.
          </h1>
          <div className="relative w-full max-w-[400px] rounded-3xl bg-[#bafcff] shadow-[0px_0px_20px_-15px_rgba(0,0,0,0.3)] ">
            <div className="mx-auto w-full min-w-0 max-w-[180px] pt-3 laptop:hidden ">
              <Image src={profile_partner} alt="사진" />
            </div>
          </div>
        </div>
        <div className="relative mx-auto flex w-full max-w-[440px] flex-col items-start justify-between px-5 laptop:max-w-[1200px] laptop:flex-row laptop:px-48 laptop:pb-10 laptop:pt-0 desktop:pt-6">
          <div className="mx-auto mt-7 hidden w-full min-w-0 delay-150 duration-300 laptop:absolute laptop:bottom-0 laptop:left-36 laptop:mx-0 laptop:inline laptop:max-w-[240px] desktop:mt-0 desktop:max-w-[280px]">
            <Image src={profile_partner} alt="사진" />
          </div>
          <div className="mx-auto flex w-full flex-col laptop:items-end">
            <div
              className="h-12 border-l-2 border-[#22D1FF] 
            pb-3 pl-4 text-base font-semibold text-gray-800 laptop:h-20 laptop:border-l-0 laptop:border-r-4 laptop:pb-4 laptop:pl-0 laptop:pr-4  laptop:text-xl desktop:text-2xl "
            >
              <div className="laptop:mb-2 laptop:mt-1 laptop:text-end">
                로봇다이브
              </div>
              <div className="text-sm font-medium laptop:text-lg desktop:text-xl ">
                파트너 컨설턴트 이력
              </div>
            </div>
            <div className="mb-10 mt-5 break-keep text-sm font-light text-gray-700 laptop:mb-0 laptop:text-end laptop:text-sm desktop:text-base">
              현) 딥트리 파트너
              <br />
              현) 직업능력심사평가원 인증 NCS 확인강사
              <br />
              전) 데이원컴퍼니 데이터사이언스 분야 전임강사
              <br />
              한양대학교 석사 졸업
              <br />
              데이터분석 관련 논문 및 강의 다수 진행
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default EventPage;
