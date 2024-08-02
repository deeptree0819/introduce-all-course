"use client";
import { ColumnDef } from "@tanstack/react-table";
import { DateFnsFormat, getUtcToDateFormat } from "@utils/date";
import Link from "next/link";

import AdminPaginatedTable from "@/app/admin/components/ui/AdminPaginatedTable";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import EventSearch from "../posts/components/EventSearch";

interface UserDto {
  id: number;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  eventTitle: string;
  eventCategory: string;
  eventStartAt: string;
  eventEndAt: string;
  eventOrganization: string;
  eventViewCount: number;
}

const DUMMY = [
  {
    id: 1,
    createdAt: "2023-12-04T11:21:02.627Z",
    updatedAt: "2023-12-04T11:21:02.627Z",
    createdBy: "어드민",
    updatedBy: "매니저",
    eventTitle: "이벤트 제목 1",
    eventCategory: "프론트엔드",
    eventStartAt: "2023-12-04T11:21:02.627Z",
    eventEndAt: "2023-12-04T11:21:02.627Z",
    eventOrganization: "이벤트 주최기관 1",
    eventViewCount: 100000,
  },
  {
    id: 2,
    createdAt: "2023-12-04T11:21:02.627Z",
    updatedAt: "2023-12-04T11:21:02.627Z",
    createdBy: "어드민",
    updatedBy: "매니저",
    eventTitle: "이벤트 제목 2",
    eventCategory: "프론트엔드",
    eventStartAt: "2023-12-04T11:21:02.627Z",
    eventEndAt: "2023-12-04T11:21:02.627Z",
    eventOrganization: "이벤트 주최기관 2",
    eventViewCount: 200,
  },
  {
    id: 3,
    createdAt: "2023-12-04T11:21:02.627Z",
    updatedAt: "2023-12-04T11:21:02.627Z",
    createdBy: "어드민",
    updatedBy: "매니저",
    eventTitle: "이벤트 제목 3",
    eventCategory: "프론트엔드",
    eventStartAt: "2023-12-04T11:21:02.627Z",
    eventEndAt: "2023-12-04T11:21:02.627Z",
    eventOrganization: "이벤트 주최기관 3",
    eventViewCount: 300,
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
    header: "작성일자",
    cell: ({ row }) => {
      const createdAt = row.original.createdAt;
      return <p>{getUtcToDateFormat(createdAt, DateFnsFormat.YYYYMMDDHHmm)}</p>;
    },
  },
  {
    accessorKey: "createdBy",
    header: "작성자",
  },
  {
    accessorKey: "eventTitle",
    header: "공고명",
  },
  {
    accessorKey: "eventCategory",
    header: "공고분야",
  },
  {
    header: "공고기간",
    cell: ({ row }) => {
      const eventStartAt = row.original.eventStartAt;
      const eventEndAt = row.original.eventEndAt;
      return (
        <p>{`${getUtcToDateFormat(
          eventStartAt,
          DateFnsFormat.YYYYMMDD
        )} ~ ${getUtcToDateFormat(eventEndAt, DateFnsFormat.YYYYMMDD)}`}</p>
      );
    },
  },
  {
    accessorKey: "eventOrganization",
    header: "주최기관",
  },
  {
    header: "조회수",
    cell: ({ row }) => {
      const eventViewCount = row.original.eventViewCount;
      return <p>{`${eventViewCount.toLocaleString()}회`}</p>;
    },
  },
  {
    accessorKey: "detail",
    header: "",
    cell: ({ row }) => {
      return (
        <Link
          href={`/admin/events/posts/${row.getValue("id")}`}
          className="text-blue-500"
        >
          상세보기
        </Link>
      );
    },
  },
];

const EventsPostsTable = () => {
  return (
    <div className="flex max-w-[1300px] flex-col space-y-7">
      <EventSearch />
      <div className="space-y-1">
        <ToggleGroup type="single" className="w-full justify-end space-x-1">
          <ToggleGroupItem value="latest" size="sm">
            최신순
          </ToggleGroupItem>
          <ToggleGroupItem value="oldest" size="sm">
            오래된순
          </ToggleGroupItem>
          <ToggleGroupItem value="due" size="sm">
            마감임박순
          </ToggleGroupItem>
          <ToggleGroupItem value="viewCount" size="sm">
            조회수순
          </ToggleGroupItem>
        </ToggleGroup>

        <AdminPaginatedTable
          data={DUMMY}
          columns={columns}
          pagination={PAGINATION_DUMMY}
        />
      </div>
    </div>
  );
};

export default EventsPostsTable;
