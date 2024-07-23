import Image, { StaticImageData } from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";

type EventCardProps = {
  item: {
    id: number;
    image: StaticImageData;
    title: string;
    organization: string;
    dday: string;
  };
};

const EventCard = ({ item }: EventCardProps) => {
  return (
    <div>
      <Link href={`/event/${item.id}`} className="space-y-3">
        <Image
          src={item.image}
          alt="event"
          className="aspect-square rounded-2xl"
          width={500}
          height={500}
        />
        <div className="space-y-2">
          <Badge className="rounded-lg border-brand bg-white font-medium text-black hover:bg-white">
            {item.dday}
          </Badge>
          <div className="space-y-1.5">
            <div className="line-clamp-2 break-keep text-sm font-semibold laptop:text-base">
              {item.title}
            </div>
            <div className="text-xs font-semibold text-slate-600 laptop:text-sm">
              {item.organization}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default EventCard;
