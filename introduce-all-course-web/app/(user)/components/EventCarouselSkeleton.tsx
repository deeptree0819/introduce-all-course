import { Skeleton } from "@/components/ui/skeleton";

const EventCarouselSkeleton = () => {
  return (
    <div className="-mx-2 flex flex-col items-center space-y-5 py-4 pl-4 laptop:px-0">
      <div className="flex w-full flex-row justify-start overflow-hidden">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            className="flex w-5/12 max-w-xs shrink-0 flex-col space-y-2 px-2 laptop:w-3/12"
            key={index}
          >
            <Skeleton className="aspect-square rounded-lg bg-slate-200" />
            <Skeleton className="h-5 w-10 rounded-lg bg-slate-200" />
            <div className="flex flex-col space-y-1">
              <Skeleton className="h-3 w-24 rounded-full bg-slate-200" />
              <Skeleton className="h-3 w-16 rounded-full bg-slate-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCarouselSkeleton;
