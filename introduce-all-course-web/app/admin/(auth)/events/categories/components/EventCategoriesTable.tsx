"use client";
import { EventCategoryDto } from "@generated/index";
import { ColumnDef } from "@tanstack/react-table";
import { DateFnsFormat, getUtcToDateFormat } from "@utils/date";
import Link from "next/link";

import AdminPaginatedTable from "@/app/admin/components/ui/AdminPaginatedTable";
import { useGetAllEventCategoriesWithPagination } from "@/app/hooks/admin/adminEventsHooks";

export const columns: ColumnDef<EventCategoryDto>[] = [
  {
    accessorKey: "event_categories_id",
    header: "ID",
  },
  {
    accessorKey: "event_category_name",
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
          href={`/admin/events/categories/${row.getValue(
            "event_categories_id"
          )}`}
          className="text-blue-500"
        >
          상세보기
        </Link>
      );
    },
  },
];

const AdminTable = () => {
  const { data: eventCategories } = useGetAllEventCategoriesWithPagination({
    page: 1,
    itemsPerPage: 50,
  });
  return (
    <div className="flex max-w-[1300px] flex-col space-y-5">
      {!!eventCategories && (
        <AdminPaginatedTable
          data={eventCategories.items}
          columns={columns}
          pagination={eventCategories.pagination}
        />
      )}
    </div>
  );
};

export default AdminTable;
