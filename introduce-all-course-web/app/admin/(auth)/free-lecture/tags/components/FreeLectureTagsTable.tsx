"use client";
import { FreeLectureTagDto } from "@generated/index";
import { ColumnDef } from "@tanstack/react-table";
import { useGetSearchParams } from "@utils/common";
import { DateFnsFormat, getUtcToDateFormat } from "@utils/date";
import Link from "next/link";

import AdminPaginatedTable from "@/app/admin/components/ui/AdminPaginatedTable";
import { useGetAllFreeLectureTagsWithPagination } from "@/app/hooks/admin/adminFreeLectureHooks";

export const columns: ColumnDef<FreeLectureTagDto>[] = [
  {
    accessorKey: "free_lecture_tags_id",
    header: "ID",
  },
  {
    accessorKey: "free_lecture_tag_name",
    header: "분야 명칭",
  },
  {
    header: "생성일자",
    cell: ({ row }) => {
      const createdAt = row.original.created_at;
      return <p>{getUtcToDateFormat(createdAt, DateFnsFormat.YYYYMMDDHHmm)}</p>;
    },
  },
  {
    accessorKey: "detail",
    header: "",
    cell: ({ row }) => {
      return (
        <Link
          href={`/admin/free-lecture/tags/${row.getValue(
            "free_lecture_tags_id"
          )}`}
          className="text-blue-500"
        >
          상세보기
        </Link>
      );
    },
  },
];

const FreeLectureTagsTable = () => {
  const { page, itemsPerPage } = useGetSearchParams();

  const { data: freelectureTags } = useGetAllFreeLectureTagsWithPagination({
    page: page ? +page : 1,
    itemsPerPage: itemsPerPage ? +itemsPerPage : 30,
  });

  if (!freelectureTags) return null;

  return (
    <div className="flex max-w-[1300px] flex-col space-y-5">
      <AdminPaginatedTable
        data={freelectureTags.items}
        columns={columns}
        pagination={freelectureTags.pagination}
      />
    </div>
  );
};

export default FreeLectureTagsTable;
