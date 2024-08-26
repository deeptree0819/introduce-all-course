import { FreeLectureSummaryDto } from "@generated/index";
import { cn } from "@utils/common";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";

type FreeLectureCardProps = {
  item: FreeLectureSummaryDto;
  hideOverflowedBadges?: boolean;
};

const FreeLectureCard = ({
  item,
  hideOverflowedBadges = false,
}: FreeLectureCardProps) => {
  return (
    <div>
      <Link
        href={`/free-lecture/${item.free_lecture_id}`}
        className="space-y-2"
      >
        <div className="overflow-hidden rounded-lg border border-slate-200">
          <Image
            src={item.free_lecture_thumbnail_url}
            alt={item.free_lecture_title}
            className="aspect-video rounded-lg transition-transform duration-500 hover:scale-105"
            width={500}
            height={500}
          />
        </div>
        <div className="space-y-1">
          <div className="line-clamp-2 break-keep text-sm font-semibold laptop:text-base">
            {item.free_lecture_title}
          </div>
          <div className="space-y-2">
            <div className="text-xs font-medium text-slate-600 laptop:text-sm">
              {item.free_lecture_channel_name}
            </div>
            <div
              className={cn(
                "flex flex-wrap gap-2",
                hideOverflowedBadges && "h-6 overflow-hidden"
              )}
            >
              {item.free_lecture_tags.map((tag, index) => (
                <Badge
                  key={index}
                  className="h-fit rounded-sm bg-[#D0E8FF] px-1 text-[10px] font-normal text-[#0029FF] hover:bg-[#D0E8FF] laptop:text-xs"
                >
                  {tag.free_lecture_tag_name}
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
