import { cn } from "@utils/common";
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
  hideOverflowedBadges?: boolean;
};

const FreeLectureCard = ({
  item,
  hideOverflowedBadges = false,
}: FreeLectureCardProps) => {
  return (
    <div>
      <Link href={`/free-lecture/${item.id}`} className="space-y-2">
        <Image
          src={item.image}
          alt={item.title}
          className="aspect-video rounded-lg"
          width={500}
          height={500}
        />
        <div className="space-y-1">
          <div className="line-clamp-2 break-keep text-sm font-semibold laptop:text-base">
            {item.title}
          </div>
          <div className="space-y-2">
            <div className="text-xs font-medium text-slate-600 laptop:text-sm">
              {item.channel}
            </div>
            <div
              className={cn(
                "flex flex-wrap gap-2",
                hideOverflowedBadges && "h-6 overflow-hidden"
              )}
            >
              {item.tags.map((tag, index) => (
                <Badge
                  key={index}
                  className="h-fit rounded-sm bg-[#D0E8FF] px-1 text-[10px] font-normal text-[#0029FF] hover:bg-[#D0E8FF] laptop:text-xs"
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
