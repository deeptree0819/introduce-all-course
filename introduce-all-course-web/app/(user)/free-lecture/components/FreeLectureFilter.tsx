"use client";

import ChipToggle from "@components/ui/ChipToggle";
import { useDeleteQueryParams, useUpdateQueryParams } from "@utils/common";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";

import { useGetAllFreeLectureTagsWithPagination } from "@/app/hooks/user/freeLectureHooks";
import { Separator } from "@/components/ui/separator";

const FreeLectureFilter = () => {
  const [freeLectureTagIds, setFreeLectureTagIds] = useState<number[]>([]);
  const { data: freeLectureTags } = useGetAllFreeLectureTagsWithPagination({
    page: 1,
    itemsPerPage: 100,
  });

  const updateQueryParams = useUpdateQueryParams();
  const deleteQueryParams = useDeleteQueryParams();
  const { replace } = useRouter();

  useEffect(() => {
    if (!!freeLectureTagIds && !!freeLectureTagIds.length) {
      replace(
        updateQueryParams({
          freeLectureTagIds: freeLectureTagIds.join(","),
        })
      );
    } else {
      replace(deleteQueryParams(["freeLectureTagIds"]));
    }
  }, [freeLectureTagIds, replace, updateQueryParams, deleteQueryParams]);

  const handleOnValueChange = (value: number) => {
    setFreeLectureTagIds((prev) => {
      if (prev.includes(value)) {
        return prev.filter((id) => id !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  if (!freeLectureTags) return null;

  return (
    <div className="w-full space-y-3 rounded-xl bg-brand-secondary p-5 shadow-inner laptop:p-9">
      <div className="text-base font-semibold laptop:text-xl">강의분야</div>
      <Separator />
      <div className="flex flex-wrap gap-2">
        {freeLectureTags.items.map((freeLectureTag, index) => (
          <Fragment key={index}>
            <ChipToggle
              label={freeLectureTag.free_lecture_tag_name}
              clicked={freeLectureTagIds.includes(
                freeLectureTag.free_lecture_tags_id
              )}
              onClick={() =>
                handleOnValueChange(freeLectureTag.free_lecture_tags_id)
              }
            />
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default FreeLectureFilter;
