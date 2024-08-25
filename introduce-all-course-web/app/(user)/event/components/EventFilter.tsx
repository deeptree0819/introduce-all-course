"use client";

import ChipToggle from "@components/ui/ChipToggle";
import { useDeleteQueryParams, useUpdateQueryParams } from "@utils/common";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";

import { useGetAllEventCategoriesWithPagination } from "@/app/hooks/user/eventsHooks";
import { Separator } from "@/components/ui/separator";

const EventFilter = () => {
  const [eventCategoryIds, setEventCategoryIds] = useState<number[]>([]);
  const { data: eventCategories } = useGetAllEventCategoriesWithPagination({
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

  if (!eventCategories) return null;

  return (
    <div className="w-full space-y-3 rounded-xl bg-brand-secondary p-5 shadow-inner laptop:p-9">
      <div className="text-base font-semibold laptop:text-xl">공고분야</div>
      <Separator />
      <div className="flex flex-wrap gap-2">
        {eventCategories.items.map((eventCategory, index) => (
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
        ))}
      </div>
    </div>
  );
};

export default EventFilter;
