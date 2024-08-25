"use client";
import { Role, UserSummaryDto } from "@generated/index";
import { ColumnDef } from "@tanstack/react-table";
import { getEnumIfExists, useGetSearchParams } from "@utils/common";
import { DateFnsFormat, getUtcToDateFormat } from "@utils/date";
import Link from "next/link";

import AdminPaginatedTable from "@/app/admin/components/ui/AdminPaginatedTable";
import { useGetAllUsersWithPagination } from "@/app/hooks/admin/adminUsersHooks";

import UserSearch from "./UserSearch";

export const columns: ColumnDef<UserSummaryDto>[] = [
  {
    accessorKey: "users_id",
    header: "ID",
  },
  {
    accessorKey: "role",
    header: "권한",
  },
  {
    accessorKey: "user_name",
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
    accessorKey: "phone_number",
    header: "전화번호",
  },
  {
    header: "가입일자",
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
          href={`/admin/users/${row.getValue("users_id")}`}
          className="text-blue-500"
        >
          상세보기
        </Link>
      );
    },
  },
];

const UserTable = () => {
  const { role, queryText, page, itemsPerPage } = useGetSearchParams();

  const { data: users } = useGetAllUsersWithPagination({
    role: getEnumIfExists(role, Role),
    queryText,
    page: page ? +page : 1,
    itemsPerPage: itemsPerPage ? +itemsPerPage : 10,
  });
  return (
    <div className="flex max-w-[1300px] flex-col space-y-5">
      <UserSearch />
      {users && (
        <AdminPaginatedTable
          data={users.items}
          columns={columns}
          pagination={users.pagination}
        />
      )}
    </div>
  );
};

export default UserTable;
