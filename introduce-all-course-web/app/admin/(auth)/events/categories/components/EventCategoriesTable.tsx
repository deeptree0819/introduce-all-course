"use client";
import { ColumnDef } from "@tanstack/react-table";
import { DateFnsFormat, getUtcToDateFormat } from "@utils/date";
import Link from "next/link";

import AdminPaginatedTable from "@/app/admin/components/ui/AdminPaginatedTable";

interface AdminDto {
  id: number;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  eventCategoryName: string;
  postsNumber: number;
}

const USER_DUMMY = [
  {
    id: 1,
    createdAt: "2023-12-04T11:21:02.627Z",
    updatedAt: "2023-12-04T11:21:02.627Z",
    createdBy: "어드민",
    eventCategoryName: "프론트엔드",
    postsNumber: 10,
  },
  {
    id: 2,
    createdAt: "2023-12-04T11:21:02.627Z",
    updatedAt: "2023-12-04T11:21:02.627Z",
    createdBy: "어드민",
    eventCategoryName: "백엔드",
    postsNumber: 10,
  },
  {
    id: 3,
    createdAt: "2023-12-04T11:21:02.627Z",
    updatedAt: "2023-12-04T11:21:02.627Z",
    createdBy: "어드민",
    eventCategoryName: "풀스택",
    postsNumber: 10,
  },
];

const PAGINATION_DUMMY = {
  totalItemCount: 15,
  currentItemCount: 10,
  totalPage: 2,
  currentPage: 1,
  itemsPerPage: 10,
};

export const columns: ColumnDef<AdminDto>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "eventCategoryName",
    header: "분야 명칭",
  },
  {
    header: "게시글 수",
    cell: ({ row }) => {
      const postsNumber = row.original.postsNumber;
      return <p>{`${postsNumber}개`}</p>;
    },
  },
  {
    accessorKey: "createdBy",
    header: "생성자",
  },
  {
    header: "생성일자",
    cell: ({ row }) => {
      const createdAt = row.original.createdAt;
      return <p>{getUtcToDateFormat(createdAt, DateFnsFormat.YYYYMMDDHHmm)}</p>;
    },
  },
  {
    accessorKey: "detail",
    header: "",
    cell: ({ row }) => {
      return (
        <Link
          href={`/admin/events/categories/${row.getValue("id")}`}
          className="text-blue-500"
        >
          상세보기
        </Link>
      );
    },
  },
];

const AdminTable = () => {
  return (
    <div className="flex max-w-[1300px] flex-col space-y-5">
      <AdminPaginatedTable
        data={USER_DUMMY}
        columns={columns}
        pagination={PAGINATION_DUMMY}
      />
    </div>
  );
};

export default AdminTable;
