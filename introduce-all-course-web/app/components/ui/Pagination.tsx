"use client";

import { cn, useUpdateQueryParams } from "@utils/common";
import { useRouter } from "next/navigation";

import * as PaginationPrimitive from "@/components/ui/pagination";

type PaginationProps = {
  currentPage: number;
  totalPage: number;
};

const Pagination = ({ currentPage, totalPage }: PaginationProps) => {
  const updateQueryParams = useUpdateQueryParams();
  const { replace } = useRouter();

  const handlePageChange = (page: number) => {
    replace(updateQueryParams({ page }));
  };

  const renderPageNumbers = () => {
    const pages = [];

    // Show the first page and ellipsis if needed
    if (totalPage > 3 && currentPage > 2) {
      pages.push(
        <PaginationPrimitive.PaginationItem key={1}>
          <PaginationPrimitive.PaginationLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(1);
            }}
          >
            1
          </PaginationPrimitive.PaginationLink>
        </PaginationPrimitive.PaginationItem>
      );
      if (totalPage > 4 && currentPage > 3) {
        pages.push(
          <PaginationPrimitive.PaginationItem key="left-ellipsis">
            <PaginationPrimitive.PaginationEllipsis />
          </PaginationPrimitive.PaginationItem>
        );
      }
    }

    // Show the middle pages (current, current-1, current+1)
    if (currentPage == 1) {
      for (let page = 1; page <= Math.min(3, totalPage); page++) {
        pages.push(
          <PaginationPrimitive.PaginationItem key={page}>
            <PaginationPrimitive.PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(page);
              }}
              isActive={currentPage === page}
            >
              {page}
            </PaginationPrimitive.PaginationLink>
          </PaginationPrimitive.PaginationItem>
        );
      }
    } else if (currentPage === totalPage) {
      for (let page = Math.max(1, totalPage - 2); page <= totalPage; page++) {
        pages.push(
          <PaginationPrimitive.PaginationItem key={page}>
            <PaginationPrimitive.PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(page);
              }}
              isActive={currentPage === page}
            >
              {page}
            </PaginationPrimitive.PaginationLink>
          </PaginationPrimitive.PaginationItem>
        );
      }
    } else {
      for (let page = currentPage - 1; page <= currentPage + 1; page++) {
        pages.push(
          <PaginationPrimitive.PaginationItem key={page}>
            <PaginationPrimitive.PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(page);
              }}
              isActive={currentPage === page}
            >
              {page}
            </PaginationPrimitive.PaginationLink>
          </PaginationPrimitive.PaginationItem>
        );
      }
    }

    // Show the last page and ellipsis if needed
    if (totalPage > 4 && currentPage < totalPage - 2) {
      pages.push(
        <PaginationPrimitive.PaginationItem key="right-ellipsis">
          <PaginationPrimitive.PaginationEllipsis />
        </PaginationPrimitive.PaginationItem>
      );
    }
    if (totalPage > 3 && currentPage < totalPage - 1) {
      pages.push(
        <PaginationPrimitive.PaginationItem key={totalPage}>
          <PaginationPrimitive.PaginationLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(totalPage);
            }}
          >
            {totalPage}
          </PaginationPrimitive.PaginationLink>
        </PaginationPrimitive.PaginationItem>
      );
    }

    return pages;
  };

  return (
    <PaginationPrimitive.Pagination>
      <PaginationPrimitive.PaginationContent>
        <PaginationPrimitive.PaginationItem>
          <PaginationPrimitive.PaginationPrevious
            href="#"
            aria-disabled={currentPage <= 1}
            tabIndex={currentPage <= 1 ? -1 : undefined}
            className={cn(
              "hidden laptop:inline-flex",
              currentPage <= 1 ? "pointer-events-none opacity-50" : undefined
            )}
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(currentPage - 1);
            }}
          />
        </PaginationPrimitive.PaginationItem>

        {renderPageNumbers()}

        <PaginationPrimitive.PaginationItem>
          <PaginationPrimitive.PaginationNext
            href="#"
            aria-disabled={currentPage >= totalPage}
            tabIndex={currentPage >= totalPage ? -1 : undefined}
            className={cn(
              "hidden laptop:inline-flex",
              currentPage >= totalPage
                ? "pointer-events-none opacity-50"
                : undefined
            )}
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(currentPage + 1);
            }}
          />
        </PaginationPrimitive.PaginationItem>
      </PaginationPrimitive.PaginationContent>
    </PaginationPrimitive.Pagination>
  );
};

export default Pagination;
