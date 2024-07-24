"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import InquiryBanner from "../../components/InquiryBanner";
import EventArticle from "./components/EventArticle";
import RelatedEvent from "./components/RelatedEvent";

const EventDetailPage = () => {
  const params = useParams();

  return (
    <main className="p-4 laptop:pb-28 laptop:pl-28 laptop:pr-7 laptop:pt-16 desktop:flex desktop:flex-row desktop:items-start">
      <div className="space-y-12">
        <EventArticle />
        <RelatedEvent />
        <InquiryBanner className="m-5 desktop:hidden" />
      </div>
      <div className="sticky top-20 mt-32 hidden min-w-fit flex-col space-y-7 rounded-2xl border border-slate-300 p-7 desktop:ml-7 desktop:flex">
        <div className="flex flex-row items-center justify-between">
          <div className="text-xl font-semibold text-slate-900">취업상담</div>
          <Link href="/inquiry" className="text-sm">
            {"자세히보기 >"}
          </Link>
        </div>
        <InquiryBanner />
      </div>
    </main>
  );
};

export default EventDetailPage;
