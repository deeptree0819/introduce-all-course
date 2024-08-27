import { Skeleton } from "@/components/ui/skeleton";

const EventListSkeleton = () => {
  return (
    <div className="grid w-full grid-cols-2 gap-5 laptop:grid-cols-3 laptop:gap-7 desktop:grid-cols-4 desktop:gap-10">
      {Array.from({ length: 4 }).map((_, index) => (
        <div className="flex flex-col space-y-2" key={index}>
          <Skeleton className="aspect-square rounded-lg" />
          <Skeleton className="h-5 w-10 rounded-lg" />
          <div className="flex flex-col space-y-1">
            <Skeleton className="h-3 w-24 rounded-full" />
            <Skeleton className="h-3 w-16 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventListSkeleton;
