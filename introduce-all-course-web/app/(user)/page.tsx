import EventCarousel from "./components/EventCarousel";
import FreeLectureCarousel from "./components/FreeLectureCarousel";
import InquiryBanner from "./components/InquiryBanner";
import InquiryBannerDesktop from "./components/InquiryBannerDesktop";
import MainCarousel from "./components/MainCarousel";

const MainPage = () => {
  return (
    <main>
      <section className="py-4 laptop:py-7">
        <MainCarousel />
      </section>
      <section className="bg-[#EDF6FF] py-10 laptop:py-20">
        <div className="mx-auto max-w-[1300px] laptop:px-24">
          <h1 className="px-4 text-base laptop:px-0 laptop:pb-2 laptop:text-2xl">
            씹고 뜯고 배우는{" "}
            <span className="font-semibold">로봇AI 행사 🤖</span>
          </h1>
          <EventCarousel />
        </div>
      </section>
      <InquiryBanner className="p-4 laptop:hidden" />
      <InquiryBannerDesktop className="mx-auto hidden max-w-[1300px] px-24 py-20 laptop:flex" />
      <section className="bg-[#F2FEFF] py-10 laptop:py-20">
        <div className="mx-auto max-w-[1300px] laptop:px-24">
          <h1 className="px-4 text-base laptop:px-0 laptop:pb-2 laptop:text-2xl">
            <span className="font-semibold">지금 놓치면 손해보는</span> 무료
            강의 👆
          </h1>
          <FreeLectureCarousel />
        </div>
      </section>
    </main>
  );
};

export default MainPage;
