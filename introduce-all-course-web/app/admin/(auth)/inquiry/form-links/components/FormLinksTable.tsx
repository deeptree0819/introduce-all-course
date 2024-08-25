"use client";
import { InquiryFormLinkDto } from "@generated/index";
import { ColumnDef } from "@tanstack/react-table";
import { useGetSearchParams } from "@utils/common";
import { DateFnsFormat, getUtcToDateFormat } from "@utils/date";
import Link from "next/link";

import AdminPaginatedTable from "@/app/admin/components/ui/AdminPaginatedTable";
import { useGetAllInquiryFormLinksWithPagination } from "@/app/hooks/admin/adminInquiryHooks";

export const columns: ColumnDef<InquiryFormLinkDto>[] = [
  {
    accessorKey: "inquiry_form_links_id",
    header: "ID",
  },
  {
    header: "링크 주소",
    cell: ({ row }) => {
      const inquiryFormLinksUrl = row.original.inquiry_form_links_url;
      return (
        <Link href={inquiryFormLinksUrl} target="_blank">
          {inquiryFormLinksUrl}
        </Link>
      );
    },
  },
  {
    accessorKey: "created_by.admin_name",
    header: "생성자",
  },
  {
    header: "생성일자",
    cell: ({ row }) => {
      const createdAt = row.original.created_at;
      return <p>{getUtcToDateFormat(createdAt, DateFnsFormat.YYYYMMDDHHmm)}</p>;
    },
  },
];

const AdminTable = () => {
  const { page, itemsPerPage } = useGetSearchParams();

  const { data: formLinks } = useGetAllInquiryFormLinksWithPagination({
    page: page ? +page : 1,
    itemsPerPage: itemsPerPage ? +itemsPerPage : 10,
  });

  if (!formLinks) return;

  return (
    <div className="flex max-w-[900px] flex-col space-y-5">
      <AdminPaginatedTable
        data={formLinks.items}
        columns={columns}
        pagination={formLinks.pagination}
      />
    </div>
  );
};

export default AdminTable;
