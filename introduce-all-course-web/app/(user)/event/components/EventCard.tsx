import Badge from "@components/ui/Badge";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

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
        <div className="overflow-hidden rounded-lg border border-slate-200">
          <Image
            src={item.image}
            alt="공고 썸네일"
            className="aspect-square rounded-lg transition-transform duration-500 hover:scale-105"
            width={500}
            height={500}
          />
        </div>
        <div className="space-y-2">
          <Badge>{item.dday}</Badge>
          <div className="space-y-1.5">
            <div className="line-clamp-2 break-keep text-sm font-semibold laptop:text-base">
              {item.title}
            </div>
            <div className="text-xs text-slate-600 laptop:text-sm">
              {item.organization}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default EventCard;
