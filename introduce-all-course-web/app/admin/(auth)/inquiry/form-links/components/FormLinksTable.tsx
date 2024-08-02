"use client";
import { ColumnDef } from "@tanstack/react-table";
import { DateFnsFormat, getUtcToDateFormat } from "@utils/date";
import Link from "next/link";

import AdminPaginatedTable from "@/app/admin/components/ui/AdminPaginatedTable";

interface AdminDto {
  id: number;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  inquiryFormLinksUrl: string;
}

const USER_DUMMY = [
  {
    id: 1,
    createdAt: "2023-12-04T11:21:02.627Z",
    updatedAt: "2023-12-04T11:21:02.627Z",
    createdBy: "어드민",
    inquiryFormLinksUrl: "https://tally.so",
  },
  {
    id: 2,
    createdAt: "2023-12-04T11:21:02.627Z",
    updatedAt: "2023-12-04T11:21:02.627Z",
    createdBy: "어드민",
    inquiryFormLinksUrl: "https://tally.so",
  },
  {
    id: 3,
    createdAt: "2023-12-04T11:21:02.627Z",
    updatedAt: "2023-12-04T11:21:02.627Z",
    createdBy: "어드민",
    inquiryFormLinksUrl: "https://tally.so",
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
    header: "링크 주소",
    cell: ({ row }) => {
      const inquiryFormLinksUrl = row.original.inquiryFormLinksUrl;
      return (
        <Link href={inquiryFormLinksUrl} target="_blank">
          {inquiryFormLinksUrl}
        </Link>
      );
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
];

const AdminTable = () => {
  return (
    <div className="flex max-w-[900px] flex-col space-y-5">
      <AdminPaginatedTable
        data={USER_DUMMY}
        columns={columns}
        pagination={PAGINATION_DUMMY}
      />
    </div>
  );
};

export default AdminTable;
