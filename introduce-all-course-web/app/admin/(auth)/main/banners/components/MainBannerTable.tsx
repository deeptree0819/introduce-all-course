"use client";
import { MainBannerSummaryDto } from "@generated/index";
import { ColumnDef } from "@tanstack/react-table";
import {
  getEnumIfExists,
  useCreateQueryParams,
  useGetSearchParams,
} from "@utils/common";
import { DateFnsFormat, getUtcToDateFormat } from "@utils/date";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import AdminPaginatedTable from "@/app/admin/components/ui/AdminPaginatedTable";
import {
  BannerStatus,
  useGetAllMainBannersWithPagination,
} from "@/app/hooks/admin/adminMainBannersHooks";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

export const columns: ColumnDef<MainBannerSummaryDto>[] = [
  {
    accessorKey: "main_banners_id",
    header: "ID",
  },
  {
    header: "진행상태",
    cell: ({ row }) => {
      const mainBannerOpenAt = row.original.main_banner_open_at;
      const mainBannerCloseAt = row.original.main_banner_close_at;
      return <p>{getBannerStatus(mainBannerOpenAt, mainBannerCloseAt)}</p>;
    },
  },
  {
    header: "이미지",
    cell: ({ row }) => {
      const id = row.original.main_banners_id;
      const mainBannerImageUrl = row.original.main_banner_image_url;
      const mainBannerUrl = row.original.main_banner_url;
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
    header: "이미지 대체텍스트",
    cell: ({ row }) => {
      const mainBannerImageName = row.original.main_banner_image_name;
      const mainBannerUrl = row.original.main_banner_image_url;
      return (
        <div className="flex flex-col items-center">
          <Link href={mainBannerUrl} target="_blank">
            {!!mainBannerImageName ? mainBannerImageName : "-"}
          </Link>
        </div>
      );
    },
  },
  {
    header: "노출 시작일시",
    cell: ({ row }) => {
      const mainBannerOpenAt = row.original.main_banner_open_at;
      return (
        <p>
          {getUtcToDateFormat(mainBannerOpenAt, DateFnsFormat.YYYYMMDDHHmm)}
        </p>
      );
    },
  },
  {
    header: "노출 종료일시",
    cell: ({ row }) => {
      const mainBannerCloseAt = row.original.main_banner_close_at;
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
          href={`/admin/main/banners/${row.getValue("main_banners_id")}`}
          className="text-blue-500"
        >
          상세보기
        </Link>
      );
    },
  },
];

const MainBannerTable = () => {
  const { status, page, itemsPerPage } = useGetSearchParams();

  const { data: mainBanners } = useGetAllMainBannersWithPagination({
    status: getEnumIfExists(status, BannerStatus),
    page: page ? +page : 1,
    itemsPerPage: itemsPerPage ? +itemsPerPage : 30,
  });

  const createQueryParams = useCreateQueryParams();
  const { replace } = useRouter();

  const handleOnValueChange = (value: string) => {
    if (value === "ALL") {
      replace(createQueryParams({}));
      return;
    }

    replace(createQueryParams({ status: value }));
  };

  return (
    <div className="flex max-w-[1300px] flex-col space-y-5">
      <div className="flex w-full flex-col items-end">
        <Select defaultValue="ALL" onValueChange={handleOnValueChange}>
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

      {mainBanners && (
        <AdminPaginatedTable
          data={mainBanners.items}
          columns={columns}
          pagination={mainBanners.pagination}
        />
      )}
    </div>
  );
};

export default MainBannerTable;
