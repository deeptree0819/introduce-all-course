import Badge from "@components/ui/Badge";
import { EventSummaryDto } from "@generated/index";
import { cn } from "@utils/common";
import { getDdayString } from "@utils/date";
import { differenceInCalendarDays } from "date-fns";
import Image from "next/image";
import Link from "next/link";

type EventCardProps = {
  item: EventSummaryDto;
};

const EventCard = ({ item }: EventCardProps) => {
  const isEnd =
    differenceInCalendarDays(new Date(item.event_end_at), new Date()) < 0;

  return (
    <Link
      href={`/event/${item.events_id}`}
      className={cn("space-y-2", isEnd && "opacity-50")}
    >
      <div className="overflow-hidden rounded-lg border border-slate-200">
        <Image
          src={item.event_thumbnail_url}
          alt="[이지엔] eZ한 숏폼 공모전 (~7/31) | 2024년 이지에디터 6기"
          className="aspect-square rounded-lg transition-transform duration-500 hover:scale-105"
          width={500}
          height={500}
        />
      </div>
      <div className="space-y-2">
        <Badge className="text-[10px]">
          {getDdayString(item.event_end_at)}
        </Badge>
        <div className="space-y-1">
          <div className="line-clamp-2 break-keep text-sm font-semibold laptop:text-base">
            {item.event_title}
          </div>
          <div className="text-xs font-medium text-slate-600 laptop:text-sm">
            {item.event_organization}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
