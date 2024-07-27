"use client";
import { ColumnDef } from "@tanstack/react-table";
import { DateFnsFormat, getUtcToDateFormat } from "@utils/date";
import Link from "next/link";

import AdminPaginatedTable from "@/app/admin/components/ui/AdminPaginatedTable";

interface UserDto {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  email: string;
  phoneNumber: string;
}

const USER_DUMMY = [
  {
    id: 1,
    createdAt: "2023-12-04T11:21:02.627Z",
    updatedAt: "2023-12-04T11:21:02.627Z",
    email: "user1@gmail.com",
    name: "유저1",
    phoneNumber: "01000000001",
  },
  {
    id: 2,
    createdAt: "2023-12-04T11:21:02.627Z",
    updatedAt: "2023-12-04T11:21:02.627Z",
    email: "user2@gmail.com",
    name: "유저2",
    phoneNumber: "01000000002",
  },
  {
    id: 3,
    createdAt: "2023-12-04T11:21:02.627Z",
    updatedAt: "2023-12-04T11:21:02.627Z",
    email: "user3@gmail.com",
    name: "유저3",
    phoneNumber: "01000000003",
  },
];

const PAGINATION_DUMMY = {
  totalItemCount: 15,
  currentItemCount: 10,
  totalPage: 2,
  currentPage: 1,
  itemsPerPage: 10,
};

export const columns: ColumnDef<UserDto>[] = [
  {
    accessorKey: "id",
    header: "ID",
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
    accessorKey: "name",
    header: "회원명",
  },
  {
    accessorKey: "email",
    header: "이메일",
  },
  {
    accessorKey: "phoneNumber",
    header: "전화번호",
  },
  {
    accessorKey: "detail",
    header: "",
    cell: ({ row }) => {
      return (
        <Link
          href={`/admin/users/${row.getValue("id")}`}
          className="text-blue-500"
        >
          상세보기
        </Link>
      );
    },
  },
];

const BootCampPostsTable = () => {
  return (
    <div className="flex w-full flex-col space-y-5">
      <AdminPaginatedTable
        data={USER_DUMMY}
        columns={columns}
        pagination={PAGINATION_DUMMY}
      />
    </div>
  );
};

export default BootCampPostsTable;
