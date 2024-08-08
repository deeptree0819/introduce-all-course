"use client";
import { AdminSummaryDto } from "@generated/index";
import { ColumnDef } from "@tanstack/react-table";
import { useGetSearchParams } from "@utils/common";
import { DateFnsFormat, getUtcToDateFormat } from "@utils/date";
import Link from "next/link";

import AdminPaginatedTable from "@/app/admin/components/ui/AdminPaginatedTable";
import { useGetAllAdminsWithPagination } from "@/app/hooks/admin/adminAdminsHooks";

import AdminSearch from "./AdminSearch";

export const columns: ColumnDef<AdminSummaryDto>[] = [
  {
    accessorKey: "admin_id",
    header: "ID",
  },
  {
    accessorKey: "admin_role",
    header: "권한",
  },
  {
    accessorKey: "admin_name",
    header: "이름",
  },
  {
    accessorKey: "admin_email",
    header: "이메일",
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
          href={`/admin/admins/${row.getValue("admin_id")}`}
          className="text-blue-500"
        >
          상세보기
        </Link>
      );
    },
  },
];

const AdminTable = () => {
  const { order, queryText, page, itemsPerPage } = useGetSearchParams();

  const { data: admins } = useGetAllAdminsWithPagination({
    order: order === "ASC" || order === "DESC" ? order : undefined,
    queryText,
    page: page ? +page : 1,
    itemsPerPage: itemsPerPage ? +itemsPerPage : 30,
  });

  return (
    <div className="flex max-w-[1300px] flex-col space-y-5">
      <AdminSearch />
      {admins && (
        <AdminPaginatedTable
          data={admins.items}
          columns={columns}
          pagination={admins.pagination}
        />
      )}
    </div>
  );
};

export default AdminTable;
