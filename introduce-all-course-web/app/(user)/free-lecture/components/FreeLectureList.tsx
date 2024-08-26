"use client";

import Pagination from "@components/ui/Pagination";
import { FreeLecturesOrderBy, Order } from "@generated/index";
import {
  useDeleteQueryParams,
  useGetSearchParams,
  useUpdateQueryParams,
} from "@utils/common";
import { useRouter } from "next/navigation";
import { Fragment } from "react";

import { useGetAllFreeLecturesWithPagination } from "@/app/hooks/user/freeLectureHooks";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import FreeLectureCard from "./FreeLectureCard";

const FreeLectureCardList = () => {
  const { freeLectureTagIds, order, page } = useGetSearchParams();

  const orderDirection = order === "oldest" ? Order.ASC : Order.DESC;
  const orderBy =
    order === "viewCount"
      ? FreeLecturesOrderBy.FREE_LECTURE_VIEW_COUNT
      : FreeLecturesOrderBy.CREATED_AT;

  const { data: freeLectures } = useGetAllFreeLecturesWithPagination({
    freeLectureTagIds:
      !!freeLectureTagIds && !!freeLectureTagIds.length
        ? freeLectureTagIds.split(",").map(Number)
        : [],
    order: orderDirection,
    orderBy,
    page: page ? +page : 1,
    itemsPerPage: 24,
  });

  const updateQueryParams = useUpdateQueryParams();
  const deleteQueryParams = useDeleteQueryParams();
  const { replace } = useRouter();

  const handleOnValueChange = (value: string) => {
    const newUrl = value
      ? updateQueryParams({ order: value })
      : deleteQueryParams(["order"]);

    if (newUrl !== window.location.href) {
      replace(newUrl);
    }
  };

  return (
    <div className="w-full space-y-20 py-3 laptop:py-10">
      <div className="flex flex-col space-y-3 laptop:space-y-5">
        <ToggleGroup
          type="single"
          className="block space-x-1 self-end"
          onValueChange={handleOnValueChange}
        >
          <ToggleGroupItem value="viewCount" size="sm">
            인기순
          </ToggleGroupItem>
          <ToggleGroupItem value="latest" size="sm">
            최신순
          </ToggleGroupItem>
          <ToggleGroupItem value="due" size="sm">
            마감임박순
          </ToggleGroupItem>
        </ToggleGroup>

        {!!freeLectures && !!freeLectures.items.length ? (
          <div className="grid w-fit grid-cols-2 gap-5 laptop:grid-cols-3 laptop:gap-7 desktop:grid-cols-4 desktop:gap-10">
            {freeLectures.items.map((item) => (
              <Fragment key={item.free_lecture_id}>
                <FreeLectureCard item={item} />
              </Fragment>
            ))}
          </div>
        ) : (
          <div className="h-10 w-full text-center">
            게시글이 존재하지 않습니다.
          </div>
        )}
      </div>

      {!!freeLectures && !!freeLectures.pagination.totalItemCount && (
        <Pagination
          currentPage={+freeLectures.pagination.currentPage.toString()}
          totalPage={+freeLectures.pagination.totalPage.toString()}
        />
      )}
    </div>
  );
};

export default FreeLectureCardList;
