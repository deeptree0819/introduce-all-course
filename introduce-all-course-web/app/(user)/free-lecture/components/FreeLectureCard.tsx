import Image, { StaticImageData } from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";

type FreeLectureCardProps = {
  item: {
    id: number;
    image: StaticImageData;
    title: string;
    channel: string;
    tags: string[];
  };
};

const FreeLectureCard = ({ item }: FreeLectureCardProps) => {
  return (
    <div>
      <Link href={`/free-lecture/${item.id}`} className="space-y-3">
        <Image
          src={item.image}
          alt="무료 강의"
          className="aspect-video rounded-2xl"
          width={500}
          height={500}
        />
        <div className="space-y-2">
          <div className="line-clamp-2 break-keep text-sm font-semibold laptop:text-base">
            {item.title}
          </div>
          <div className="space-y-3">
            <div className="text-xs font-semibold text-slate-600 laptop:text-sm">
              {item.channel}
            </div>
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag, index) => (
                <Badge
                  key={index}
                  className="rounded-sm bg-[#D0E8FF] text-[10px] font-medium text-[#0029FF] hover:bg-[#D0E8FF] laptop:text-xs"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default FreeLectureCard;
