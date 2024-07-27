"use client";
import { ColumnDef } from "@tanstack/react-table";
import { DateFnsFormat, getUtcToDateFormat } from "@utils/date";
import Link from "next/link";

import AdminPaginatedTable from "@/app/admin/components/ui/AdminPaginatedTable";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import EventSearch from "./EventSearch";

interface UserDto {
  id: number;
  createdAt: string;
  updatedAt: string;
  eventTitle: string;
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
    eventTitle: "이벤트 제목 1",
    eventStartAt: "2023-12-04T11:21:02.627Z",
    eventEndAt: "2023-12-04T11:21:02.627Z",
    eventOrganization: "이벤트 주최기관 1",
    eventViewCount: 100000,
  },
  {
    id: 2,
    createdAt: "2023-12-04T11:21:02.627Z",
    updatedAt: "2023-12-04T11:21:02.627Z",
    eventTitle: "이벤트 제목 2",
    eventStartAt: "2023-12-04T11:21:02.627Z",
    eventEndAt: "2023-12-04T11:21:02.627Z",
    eventOrganization: "이벤트 주최기관 2",
    eventViewCount: 200,
  },
  {
    id: 3,
    createdAt: "2023-12-04T11:21:02.627Z",
    updatedAt: "2023-12-04T11:21:02.627Z",
    eventTitle: "이벤트 제목 3",
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
    accessorKey: "createdAt",
    header: "작성일자",
    cell: ({ row }) => {
      const createdAt = row.original.createdAt;
      return <p>{getUtcToDateFormat(createdAt, DateFnsFormat.YYYYMMDDHHmm)}</p>;
    },
  },

  {
    accessorKey: "eventTitle",
    header: "공고명",
  },
  {
    accessorKey: "eventStartAt",
    header: "공고시작일",
    cell: ({ row }) => {
      const eventStartAt = row.original.eventStartAt;
      return <p>{getUtcToDateFormat(eventStartAt, DateFnsFormat.YYYYMMDD)}</p>;
    },
  },
  {
    accessorKey: "eventEndAt",
    header: "공고종료일",
    cell: ({ row }) => {
      const eventEndAt = row.original.eventEndAt;
      return <p>{getUtcToDateFormat(eventEndAt, DateFnsFormat.YYYYMMDD)}</p>;
    },
  },
  {
    accessorKey: "eventOrganization",
    header: "주최기관",
  },
  {
    accessorKey: "eventViewCount",
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
          href={`/admin/users/${row.getValue("id")}`}
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
