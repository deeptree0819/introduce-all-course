"use client";
import { ColumnDef } from "@tanstack/react-table";
import { DateFnsFormat, getUtcToDateFormat } from "@utils/date";
import Link from "next/link";

import AdminPaginatedTable from "@/app/admin/components/ui/AdminPaginatedTable";

import UserSearch from "./UserSearch";

interface UserDto {
  id: number;
  createdAt: string;
  updatedAt: string;
  nickname: string;
  email: string;
  phoneNumber: string;
}

const USER_DUMMY = [
  {
    id: 1,
    createdAt: "2023-12-04T11:21:02.627Z",
    updatedAt: "2023-12-04T11:21:02.627Z",
    email: "user1@gmail.com",
    userName: "김로보트",
    nickname: "로봇에 흠뻑 빠진 내모습 1",
    role: "일반",
    phoneNumber: "010-1234-5678",
  },
  {
    id: 2,
    createdAt: "2023-12-04T11:21:02.627Z",
    updatedAt: "2023-12-04T11:21:02.627Z",
    email: "user2@gmail.com",
    userName: "김로보트",
    nickname: "로봇에 흠뻑 빠진 내모습 2",
    role: "일반",
    phoneNumber: "010-1234-5678",
  },
  {
    id: 3,
    createdAt: "2023-12-04T11:21:02.627Z",
    updatedAt: "2023-12-04T11:21:02.627Z",
    email: "user3@gmail.com",
    userName: "김로보트",
    nickname: "로봇에 흠뻑 빠진 내모습 3",
    role: "전문가",
    phoneNumber: "010-1234-5678",
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
    accessorKey: "role",
    header: "권한",
  },
  {
    accessorKey: "userName",
    header: "실명",
  },
  {
    accessorKey: "nickname",
    header: "닉네임",
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
          href={`/admin/users/${row.getValue("id")}`}
          className="text-blue-500"
        >
          상세보기
        </Link>
      );
    },
  },
];

const UserTable = () => {
  return (
    <div className="flex max-w-[1300px] flex-col space-y-5">
      <UserSearch />
      <AdminPaginatedTable
        data={USER_DUMMY}
        columns={columns}
        pagination={PAGINATION_DUMMY}
      />
    </div>
  );
};

export default UserTable;
