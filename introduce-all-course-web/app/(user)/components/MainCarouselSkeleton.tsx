import { Skeleton } from "@/components/ui/skeleton";

const MainCarouselSkeleton = () => {
  return (
    <div className="flex flex-col items-center space-y-5">
      <div className="flex w-full flex-row justify-center space-x-4 overflow-hidden">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton
            className="aspect-video w-10/12 max-w-xl shrink-0 rounded-2xl laptop:basis-6/12 laptop:rounded-3xl"
            key={index}
          />
        ))}
      </div>
      <div className="flex flex-row items-center space-x-3 laptop:space-x-10">
        <Skeleton className="size-4 rounded-full laptop:size-7" />
        <Skeleton className="h-4 w-10 laptop:w-[60px]" />
        <Skeleton className="size-4 rounded-full laptop:size-7" />
      </div>
    </div>
  );
};

export default MainCarouselSkeleton;
