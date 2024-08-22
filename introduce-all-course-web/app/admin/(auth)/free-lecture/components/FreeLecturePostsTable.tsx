"use client";
import {
  FreeLecturesOrderBy,
  FreeLectureSummaryDto,
  Order,
} from "@generated/index";
import { ColumnDef } from "@tanstack/react-table";
import { useGetSearchParams, useUpdateQueryParams } from "@utils/common";
import { DateFnsFormat, getUtcToDateFormat } from "@utils/date";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import AdminPaginatedTable from "@/app/admin/components/ui/AdminPaginatedTable";
import { useGetAllFreeLecturesWithPagination } from "@/app/hooks/admin/adminFreeLectureHooks";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import FreeLecturePostDeleteButton from "../posts/[postId]/components/FreeLecturePostDeleteButton";
import FreeLecturePostsSearch from "../posts/components/FreeLecturePostsSearch";

export const columns: ColumnDef<FreeLectureSummaryDto>[] = [
  {
    accessorKey: "free_lecture_id",
    header: "ID",
  },
  {
    accessorKey: "free_lecture_title",
    header: "무료강의 제목",
  },
  {
    header: "무료강의 유튜브 링크",
    cell: ({ row }) => {
      const freeLectureUrl = row.original.free_lecture_url;
      return (
        <Link href={freeLectureUrl} target="_blank">
          {freeLectureUrl}
        </Link>
      );
    },
  },
  {
    header: "조회수",
    cell: ({ row }) => {
      const freeLectureViewCount = row.original.free_lecture_view_count;
      return <p>{`${freeLectureViewCount.toLocaleString()}회`}</p>;
    },
  },
  {
    header: "작성일자",
    cell: ({ row }) => {
      const createdAt = row.original.created_at;
      return <p>{getUtcToDateFormat(createdAt, DateFnsFormat.YYYYMMDDHHmm)}</p>;
    },
  },
  {
    accessorKey: "created_by.admin_name",
    header: "작성자",
  },
  {
    accessorKey: "detail",
    header: "",
    cell: ({ row }) => {
      return (
        <Link
          href={`/admin/free-lecture/posts/${row.getValue("free_lecture_id")}`}
          className="text-blue-500"
        >
          상세보기
        </Link>
      );
    },
  },
  {
    accessorKey: "delete",
    header: "",
    cell: ({ row }) => {
      return (
        <FreeLecturePostDeleteButton
          postId={row.getValue("free_lecture_id")}
          variant="icon"
        />
      );
    },
  },
];

const FreeLecturePostsTable = () => {
  const params = useParams<{ freeLectureTagId: string }>();
  const freeLectureTagId = params.freeLectureTagId;

  const { queryText, order, page, itemsPerPage } = useGetSearchParams();

  const orderDirection = order === "oldest" ? Order.ASC : Order.DESC;
  const orderBy =
    order === "viewCount"
      ? FreeLecturesOrderBy.FREE_LECTURE_VIEW_COUNT
      : FreeLecturesOrderBy.CREATED_AT;

  const { data: freeLectures } = useGetAllFreeLecturesWithPagination({
    order: orderDirection,
    orderBy,
    queryText,
    freeLectureTagId,
    page: page ? +page : 1,
    itemsPerPage: itemsPerPage ? +itemsPerPage : 30,
  });

  const updateQueryParams = useUpdateQueryParams();
  const { replace } = useRouter();

  const handleOnValueChange = (value: string) => {
    replace(updateQueryParams({ order: value }));
  };

  return (
    <div className="flex max-w-[1300px] flex-col space-y-7">
      <FreeLecturePostsSearch />
      <div className="space-y-1">
        <ToggleGroup
          type="single"
          className="w-full justify-end space-x-1"
          onValueChange={handleOnValueChange}
        >
          <ToggleGroupItem value="latest" size="sm">
            최신순
          </ToggleGroupItem>
          <ToggleGroupItem value="oldest" size="sm">
            오래된순
          </ToggleGroupItem>
          <ToggleGroupItem value="viewCount" size="sm">
            조회수순
          </ToggleGroupItem>
        </ToggleGroup>
        {freeLectures && (
          <AdminPaginatedTable
            data={freeLectures.items}
            columns={columns}
            pagination={freeLectures.pagination}
          />
        )}
      </div>
    </div>
  );
};

export default FreeLecturePostsTable;
