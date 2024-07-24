import InquiryBanner from "../../components/InquiryBanner";
import InquiryBannerPacked from "../../components/InquiryBannerPacked";
import FreeLectureArticle from "./components/FreeLectureArticle";

const FreeLectureDetailPage = () => {
  return (
    <main className="p-4 laptop:pb-28 laptop:pl-28 laptop:pr-7 laptop:pt-16 desktop:flex desktop:flex-row desktop:items-start">
      <FreeLectureArticle className="desktop:flex-1" />
      <InquiryBanner className="mb-5 mt-20 desktop:hidden" />
      <InquiryBannerPacked className="mt-12" />
    </main>
  );
};

export default FreeLectureDetailPage;