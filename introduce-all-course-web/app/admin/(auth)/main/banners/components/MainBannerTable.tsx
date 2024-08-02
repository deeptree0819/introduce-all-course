"use client";
import { ColumnDef } from "@tanstack/react-table";
import { DateFnsFormat, getUtcToDateFormat } from "@utils/date";
import Image from "next/image";
import Link from "next/link";

import AdminPaginatedTable from "@/app/admin/components/ui/AdminPaginatedTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AdminDto {
  id: number;
  createdAt: string;
  updatedAt: string;
  mainBannerImageUrl: string;
  mainBannerImageName: string;
  mainBannerUrl: string;
  mainBannerOpenAt: string;
  mainBannerCloseAt: string;
}

const USER_DUMMY = [
  {
    id: 1,
    createdAt: "2023-12-04T11:21:02.627Z",
    updatedAt: "2023-12-04T11:21:02.627Z",
    mainBannerImageUrl: "https://picsum.photos/500/300",
    mainBannerImageName: "구름톤 딥다이브 프로덕트 매니지먼트 과정 모집",
    mainBannerUrl:
      "https://unsplash.com/photos/brown-tabby-kitten-sitting-on-floor-nKC772R_qog",
    mainBannerOpenAt: "2023-12-04T11:21:02.627Z",
    mainBannerCloseAt: "2024-12-04T11:21:02.627Z",
  },
  {
    id: 2,
    createdAt: "2023-12-04T11:21:02.627Z",
    updatedAt: "2023-12-04T11:21:02.627Z",
    mainBannerImageUrl: "https://picsum.photos/500/300",
    mainBannerImageName: "메인배너1",
    mainBannerUrl:
      "https://unsplash.com/photos/brown-tabby-kitten-sitting-on-floor-nKC772R_qog",
    mainBannerOpenAt: "2023-12-04T11:21:02.627Z",
    mainBannerCloseAt: "",
  },
  {
    id: 2,
    createdAt: "2023-12-04T11:21:02.627Z",
    updatedAt: "2023-12-04T11:21:02.627Z",
    mainBannerImageUrl: "https://picsum.photos/500/300",
    mainBannerImageName: "메인배너1",
    mainBannerUrl:
      "https://unsplash.com/photos/brown-tabby-kitten-sitting-on-floor-nKC772R_qog",
    mainBannerOpenAt: "2024-12-04T11:21:02.627Z",
    mainBannerCloseAt: "2025-12-04T11:21:02.627Z",
  },
  {
    id: 2,
    createdAt: "2023-12-04T11:21:02.627Z",
    updatedAt: "2023-12-04T11:21:02.627Z",
    mainBannerImageUrl: "https://picsum.photos/500/300",
    mainBannerImageName: "메인배너1",
    mainBannerUrl:
      "https://unsplash.com/photos/brown-tabby-kitten-sitting-on-floor-nKC772R_qog",
    mainBannerOpenAt: "2023-12-04T11:21:02.627Z",
    mainBannerCloseAt: "2023-12-04T11:21:02.627Z",
  },
];

const PAGINATION_DUMMY = {
  totalItemCount: 10,
  currentItemCount: 10,
  totalPage: 1,
  currentPage: 1,
  itemsPerPage: 10,
};

const getBannerStatus = (
  mainBannerOpenAt: string,
  mainBannerCloseAt: string
) => {
  const now = new Date();
  const openDate = new Date(mainBannerOpenAt);
  const closeDate = mainBannerCloseAt ? new Date(mainBannerCloseAt) : null;

  if (now < openDate) {
    return "대기";
  } else if (closeDate && now > closeDate) {
    return "종료";
  } else {
    return "게시중";
  }
};

export const columns: ColumnDef<AdminDto>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    header: "진행상태",
    cell: ({ row }) => {
      const mainBannerOpenAt = row.original.mainBannerOpenAt;
      const mainBannerCloseAt = row.original.mainBannerCloseAt;
      return <p>{getBannerStatus(mainBannerOpenAt, mainBannerCloseAt)}</p>;
    },
  },
  {
    accessorKey: "mainBannerImageUrl",
    header: "이미지",
    cell: ({ row }) => {
      const id = row.original.id;
      const mainBannerImageUrl = row.original.mainBannerImageUrl;
      const mainBannerUrl = row.original.mainBannerUrl;
      return (
        <Link
          className="flex flex-col items-center"
          href={mainBannerUrl}
          target="_blank"
        >
          <Image
            src={mainBannerImageUrl}
            alt={`Banner image #${id}`}
            width={160}
            height={90}
            className="aspect-video w-36"
          />
        </Link>
      );
    },
  },
  {
    accessorKey: "mainBannerImageName",
    header: "이미지명",
    cell: ({ row }) => {
      const mainBannerImageName = row.original.mainBannerImageName;
      const mainBannerUrl = row.original.mainBannerUrl;
      return (
        <div className="flex flex-col items-center">
          <Link href={mainBannerUrl} target="_blank">
            {mainBannerImageName}
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: "mainBannerOpenAt",
    header: "노출 시작일시",
    cell: ({ row }) => {
      const mainBannerOpenAt = row.original.mainBannerOpenAt;
      return (
        <p>
          {getUtcToDateFormat(mainBannerOpenAt, DateFnsFormat.YYYYMMDDHHmm)}
        </p>
      );
    },
  },
  {
    accessorKey: "mainBannerCloseAt",
    header: "노출 종료일시",
    cell: ({ row }) => {
      const mainBannerCloseAt = row.original.mainBannerCloseAt;
      return mainBannerCloseAt ? (
        <p>
          {getUtcToDateFormat(mainBannerCloseAt, DateFnsFormat.YYYYMMDDHHmm)}
        </p>
      ) : (
        <p>무기한</p>
      );
    },
  },
  {
    accessorKey: "detail",
    header: "",
    cell: ({ row }) => {
      return (
        <Link
          href={`/admin/main/banners/${row.getValue("id")}`}
          className="text-blue-500"
        >
          상세보기
        </Link>
      );
    },
  },
];

const MainBannerTable = () => {
  return (
    <div className="flex max-w-[1300px] flex-col space-y-5">
      <div className="flex w-full flex-col items-end">
        <Select defaultValue="ALL">
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">전체</SelectItem>
            <SelectItem value="BEFORE">대기 배너</SelectItem>
            <SelectItem value="PROGRESS">게시된 배너</SelectItem>
            <SelectItem value="AFTER">종료 배너</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <AdminPaginatedTable
        data={USER_DUMMY}
        columns={columns}
        pagination={PAGINATION_DUMMY}
      />
    </div>
  );
};

export default MainBannerTable;
