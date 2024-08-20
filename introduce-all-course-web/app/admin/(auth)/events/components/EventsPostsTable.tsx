"use client";
import { EventsOrderBy, EventSummaryDto, Order } from "@generated/index";
import { ColumnDef } from "@tanstack/react-table";
import { useCreateQueryParams, useGetSearchParams } from "@utils/common";
import { DateFnsFormat, getUtcToDateFormat } from "@utils/date";
import Link from "next/link";
import { useRouter } from "next/navigation";

import AdminPaginatedTable from "@/app/admin/components/ui/AdminPaginatedTable";
import { useGetAllEventsWithPagination } from "@/app/hooks/admin/adminEventsHooks";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import EventPostDeleteButton from "../posts/[postId]/components/EventPostDeleteButton";
import EventSearch from "../posts/components/EventSearch";

export const columns: ColumnDef<EventSummaryDto>[] = [
  {
    accessorKey: "events_id",
    header: "ID",
  },
  {
    header: "공고명",
    cell: ({ row }) => {
      const eventTitle = row.original.event_title;
      return (
        <div className="flex flex-col items-center">
          <p className="w-52">{eventTitle}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "event_category_name",
    header: "공고분야",
  },
  {
    header: "공고기간",
    cell: ({ row }) => {
      const eventStartAt = row.original.event_start_at;
      const eventEndAt = row.original.event_end_at;
      return (
        <p>{`${getUtcToDateFormat(
          eventStartAt,
          DateFnsFormat.YYYYMMDD
        )} ~ ${getUtcToDateFormat(eventEndAt, DateFnsFormat.YYYYMMDD)}`}</p>
      );
    },
  },
  {
    accessorKey: "event_organization",
    header: "주최기관",
  },
  {
    header: "조회수",
    cell: ({ row }) => {
      const eventViewCount = row.original.event_view_count;
      return <p>{`${eventViewCount.toLocaleString()}회`}</p>;
    },
  },
  {
    header: "작성일자",
    cell: ({ row }) => {
      const createdAt = row.original.created_at;
      return <p>{getUtcToDateFormat(createdAt, DateFnsFormat.YYYYMMDDHHmm)}</p>;
    },
  },
  {
    header: "작성자",
    cell: ({ row }) => {
      const createdBy = row.original.created_by.admin_name;
      return <p>{createdBy}</p>;
    },
  },
  {
    accessorKey: "detail",
    header: "",
    cell: ({ row }) => {
      return (
        <Link
          href={`/admin/events/posts/${row.getValue("events_id")}`}
          className="text-blue-500"
        >
          상세보기
        </Link>
      );
    },
  },
  {
    accessorKey: "delete",
    header: "",
    cell: ({ row }) => {
      return (
        <EventPostDeleteButton
          postId={row.getValue("events_id")}
          variant="icon"
        />
      );
    },
  },
];

const EventsPostsTable = () => {
  const { queryText, order, page, itemsPerPage } = useGetSearchParams();

  const orderDirection = order === "oldest" ? Order.ASC : Order.DESC;
  const orderBy =
    order === "due"
      ? EventsOrderBy.EVENT_END_AT
      : order === "viewCount"
      ? EventsOrderBy.EVENT_VIEW_COUNT
      : EventsOrderBy.CREATED_AT;

  const { data: events } = useGetAllEventsWithPagination({
    order: orderDirection,
    orderBy,
    queryText,
    page: page ? +page : 1,
    itemsPerPage: itemsPerPage ? +itemsPerPage : 30,
  });

  const createQueryParams = useCreateQueryParams();
  const { replace } = useRouter();

  const handleOnValueChange = (value: string) => {
    replace(createQueryParams({ order: value }));
  };

  return (
    <div className="flex max-w-[1300px] flex-col space-y-7">
      <EventSearch />
      <div className="space-y-1">
        <ToggleGroup
          type="single"
          className="w-full justify-end space-x-1"
          onValueChange={handleOnValueChange}
        >
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

        {events && (
          <AdminPaginatedTable
            data={events.items}
            columns={columns}
            pagination={events.pagination}
          />
        )}
      </div>
    </div>
  );
};

export default EventsPostsTable;
