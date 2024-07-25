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
    <Link href={`/event/${item.id}`} className="space-y-3">
      <div className="overflow-hidden rounded-lg border border-slate-200">
        <Image
          src={item.image}
          alt="[이지엔] eZ한 숏폼 공모전 (~7/31) | 2024년 이지에디터 6기"
          className="aspect-square rounded-lg transition-transform duration-500 hover:scale-105"
          width={500}
          height={500}
        />
      </div>
      <div className="space-y-2">
        <Badge className="text-[10px]">{item.dday}</Badge>
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
  );
};

export default EventCard;
