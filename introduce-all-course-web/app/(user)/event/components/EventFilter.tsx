"use client";

import ChipToggle from "@components/ui/ChipToggle";
import { useDeleteQueryParams, useUpdateQueryParams } from "@utils/common";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";

import { useGetAllEventCategoriesWithPagination } from "@/app/hooks/user/eventsHooks";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const EventFilter = () => {
  const [eventCategoryIds, setEventCategoryIds] = useState<number[]>([]);
  const { data: eventCategories, isLoading } =
    useGetAllEventCategoriesWithPagination({
      page: 1,
      itemsPerPage: 100,
    });

  const updateQueryParams = useUpdateQueryParams();
  const deleteQueryParams = useDeleteQueryParams();
  const { replace } = useRouter();

  useEffect(() => {
    if (!!eventCategoryIds && !!eventCategoryIds.length) {
      replace(
        updateQueryParams({
          eventCategoryIds: eventCategoryIds.join(","),
        })
      );
    } else {
      replace(deleteQueryParams(["eventCategoryIds"]));
    }
  }, [eventCategoryIds, replace, updateQueryParams, deleteQueryParams]);

  const handleOnValueChange = (value: number) => {
    setEventCategoryIds((prev) => {
      if (prev.includes(value)) {
        return prev.filter((id) => id !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  return (
    <div className="w-full space-y-3 rounded-xl bg-brand-secondary p-5 shadow-inner laptop:p-9">
      <div className="text-base font-semibold laptop:text-xl">커리큘럼</div>
      <Separator />
      <div className="flex flex-wrap gap-2">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <Skeleton
              className="h-6 w-12 rounded-xl bg-slate-200"
              key={index}
            />
          ))
        ) : !!eventCategories && !!eventCategories.items.length ? (
          eventCategories.items.map((eventCategory, index) => (
            <Fragment key={index}>
              <ChipToggle
                label={eventCategory.event_category_name}
                clicked={eventCategoryIds.includes(
                  eventCategory.event_categories_id
                )}
                onClick={() =>
                  handleOnValueChange(eventCategory.event_categories_id)
                }
              />
            </Fragment>
          ))
        ) : (
          <div>커리큘럼가 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default EventFilter;
