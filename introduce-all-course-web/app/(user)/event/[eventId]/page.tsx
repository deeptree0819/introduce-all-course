import { EventsService } from "@generated/index";
import { Metadata } from "next";

import InquiryBanner from "../../components/InquiryBanner";
import InquiryBannerPacked from "../../components/InquiryBannerPacked";
import EventArticle from "./components/EventArticle";
import RelatedEvent from "./components/RelatedEvent";

type Props = {
  params: { eventId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const eventId = +params.eventId;

  const event = await EventsService.getEventById(eventId);

  if (!event)
    return {
      title: {
        absolute: "로봇다이브",
      },
      description: "로봇/AI 공고 정보는 로봇다이브",
    };

  return {
    title: event.event_title,
    description: "로봇/AI 공고 정보는 로봇다이브",
    openGraph: {
      title: event.event_title,
      description: "로봇/AI 공고 정보는 로봇다이브",
      images: event.event_thumbnail_url,
    },
  };
}

const EventDetailPage = () => {
  return (
    <main className="mx-auto max-w-[1300px] p-4 laptop:px-24 laptop:pb-28 laptop:pt-10 desktop:flex desktop:flex-row desktop:items-start desktop:pr-0">
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
