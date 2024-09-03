import { FreeLecturesService } from "@generated/index";
import { Metadata } from "next";

import InquiryBanner from "../../components/InquiryBanner";
import InquiryBannerPacked from "../../components/InquiryBannerPacked";
import FreeLectureArticle from "./components/FreeLectureArticle";

type Props = {
  params: { freeLectureId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const freeLectureId = +params.freeLectureId;

  const freeLecture =
    await FreeLecturesService.getFreeLectureById(freeLectureId);

  if (!freeLecture)
    return {
      title: {
        absolute: "로봇다이브",
      },
      description: "로봇/AI 무료 강의는 로봇다이브",
    };

  return {
    title: freeLecture.free_lecture_title,
    description: "로봇/AI 무료 강의는 로봇다이브",
    openGraph: {
      title: freeLecture.free_lecture_title,
      description: "로봇/AI 무료 강의는 로봇다이브",
      images: freeLecture.free_lecture_thumbnail_url,
    },
  };
}
const FreeLectureDetailPage = () => {
  return (
    <main className="mx-auto max-w-[1300px] p-4 laptop:pb-28 laptop:pl-24 laptop:pr-0 laptop:pt-10 desktop:flex desktop:flex-row desktop:items-start">
      <FreeLectureArticle className="desktop:flex-1" />
      <InquiryBanner className="mb-5 mt-20 desktop:hidden" />
      <InquiryBannerPacked className="mt-24" />
    </main>
  );
};

export default FreeLectureDetailPage;
