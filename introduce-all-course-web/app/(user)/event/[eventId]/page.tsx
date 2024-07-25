"use client";

import { useParams } from "next/navigation";

import InquiryBanner from "../../components/InquiryBanner";
import InquiryBannerPacked from "../../components/InquiryBannerPacked";
import EventArticle from "./components/EventArticle";
import RelatedEvent from "./components/RelatedEvent";

const EventDetailPage = () => {
  const params = useParams();

  return (
    <main className="p-4 laptop:px-28 laptop:pb-28 laptop:pt-16 desktop:flex desktop:flex-row desktop:items-start desktop:pr-7">
      <div className="space-y-12 desktop:flex-1">
        <EventArticle />
        <RelatedEvent />
        <InquiryBanner className="m-5 desktop:hidden" />
      </div>
      <InquiryBannerPacked />
    </main>
  );
};

export default EventDetailPage;
