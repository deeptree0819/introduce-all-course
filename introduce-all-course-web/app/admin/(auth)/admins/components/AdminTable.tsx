"use client";
import { ColumnDef } from "@tanstack/react-table";
import { DateFnsFormat, getUtcToDateFormat } from "@utils/date";
import Link from "next/link";

import AdminPaginatedTable from "@/app/admin/components/ui/AdminPaginatedTable";

import AdminSearch from "./AdminSearch";

interface AdminDto {
  id: number;
  createdAt: string;
  updatedAt: string;
  adminName: string;
  adminRole: string;
  adminEmail: string;
  adminPassword: string;
}

const USER_DUMMY = [
  {
    id: 1,
    createdAt: "2023-12-04T11:21:02.627Z",
    updatedAt: "2023-12-04T11:21:02.627Z",
    adminName: "어드민",
    adminRole: "어드민",
    adminEmail: "admin@gmail.com",
    adminPassword: "asdf1234",
  },
  {
    id: 2,
    createdAt: "2023-12-04T11:21:02.627Z",
    updatedAt: "2023-12-04T11:21:02.627Z",
    adminName: "매니저",
    adminRole: "매니저",
    adminEmail: "manager@gmail.com",
    adminPassword: "asdf1234",
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
    accessorKey: "adminRole",
    header: "권한",
  },
  {
    accessorKey: "adminName",
    header: "이름",
  },
  {
    accessorKey: "adminEmail",
    header: "이메일",
  },
  {
    accessorKey: "createdAt",
    header: "가입일자",
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
          href={`/admin/admins/${row.getValue("id")}`}
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
      <AdminSearch />
      <AdminPaginatedTable
        data={USER_DUMMY}
        columns={columns}
        pagination={PAGINATION_DUMMY}
      />
    </div>
  );
};

export default AdminTable;
