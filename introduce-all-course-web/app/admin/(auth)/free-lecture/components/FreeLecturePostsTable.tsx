"use client";
import { ColumnDef } from "@tanstack/react-table";
import { DateFnsFormat, getUtcToDateFormat } from "@utils/date";
import Link from "next/link";

import AdminPaginatedTable from "@/app/admin/components/ui/AdminPaginatedTable";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import EventSearch from "../posts/components/FreeLecturePostsSearch";

interface FreeLectureDto {
  id: number;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  freeLectureTitle: string;
  freeLectureUrl: string;
  freeLectureDescription: string;
  freeLectureViewCount: number;
}

const DUMMY = [
  {
    id: 1,
    createdAt: "2023-12-04T11:21:02.627Z",
    updatedAt: "2023-12-04T11:21:02.627Z",
    createdBy: "어드민",
    updatedBy: "매니저",
    freeLectureTitle: "로봇 인공지능 융합 교육 트랙 강의",
    freeLectureUrl: "https://www.youtube.com/watch?v=bxrGfZCPDhQ",
    freeLectureDescription: "",
    freeLectureViewCount: 100000,
  },
];

const PAGINATION_DUMMY = {
  totalItemCount: 15,
  currentItemCount: 10,
  totalPage: 2,
  currentPage: 1,
  itemsPerPage: 10,
};

export const columns: ColumnDef<FreeLectureDto>[] = [
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
    accessorKey: "freeLectureTitle",
    header: "무료강의 제목",
  },
  {
    header: "무료강의 유튜브 링크",
    cell: ({ row }) => {
      const freeLectureUrl = row.original.freeLectureUrl;
      return (
        <Link href={freeLectureUrl} target="_blank">
          {freeLectureUrl}
        </Link>
      );
    },
  },
  {
    header: "조회수",
    cell: ({ row }) => {
      const freeLectureViewCount = row.original.freeLectureViewCount;
      return <p>{`${freeLectureViewCount.toLocaleString()}회`}</p>;
    },
  },
  {
    accessorKey: "detail",
    header: "",
    cell: ({ row }) => {
      return (
        <Link
          href={`/admin/free-lecture/posts/${row.getValue("id")}`}
          className="text-blue-500"
        >
          상세보기
        </Link>
      );
    },
  },
];

const FreeLecturePostsTable = () => {
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

export default FreeLecturePostsTable;
