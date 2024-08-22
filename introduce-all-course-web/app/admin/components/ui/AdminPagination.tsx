import { cn, pageRange } from "@utils/common";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { ButtonHTMLAttributes, FC, HTMLAttributes } from "react";

export const DEFAULT_ITEMS_PER_PAGE = 10;

export interface AdminPaginationProps extends HTMLAttributes<HTMLDivElement> {}

const AdminPagination: FC<AdminPaginationProps> & {
  Label: FC<PaginationLabelProps>;
  Nav: FC<AdminPaginationNavProps> & { Button: FC<PaginationNavButtonProps> };
} = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(`flex items-center justify-between px-6 py-3`, className)}
      {...props}
    >
      {children}
    </div>
  );
};

export interface PaginationLabelProps
  extends HTMLAttributes<HTMLParagraphElement> {
  count: number;
  total: number;
}

const AdminPaginationLabel: FC<PaginationLabelProps> = ({
  className,
  count,
  total,
  ...props
}) => {
  return (
    <p className={cn(`text-sm text-gray-700`, className)} {...props}>
      현재 페이지:
      <span className="font-medium"> {count} </span>/ 전체 개수:
      <span className="font-medium"> {total} </span>
    </p>
  );
};

export interface AdminPaginationNavProps
  extends HTMLAttributes<HTMLDivElement> {
  total: number;
  maxPageSetLength?: number;
}

const AdminPaginationNav: FC<AdminPaginationNavProps> & {
  Button: FC<PaginationNavButtonProps>;
} = ({ className, total, maxPageSetLength = 7, ...props }) => {
  const params = useSearchParams();
  const page = params.get("page") || 1;
  const limit = params.get("limit") || DEFAULT_ITEMS_PER_PAGE;

  const pageCount = Math.ceil(total / +limit);
  const pageSet = Math.ceil(+page / maxPageSetLength);
  const pageSetLength = Math.min(
    pageCount - (pageSet - 1) * maxPageSetLength,
    maxPageSetLength
  );
  const prevPage = (pageSet - 2) * pageSetLength + 1;
  const nextPage = pageSet * maxPageSetLength + 1;

  const getPageUrl = (page: number) => {
    if (typeof window === "undefined") return "";
    const url = new URL(window.location.href);
    url.searchParams.set("page", page.toString());
    url.searchParams.set("limit", limit.toString());
    return url.toString();
  };

  return (
    <nav className={cn(`flex -space-x-px shadow-sm`, className)} {...props}>
      <AdminPaginationNavButton
        className="rounded-l-md"
        to={`${getPageUrl(prevPage)}`}
        disabled={prevPage < 1}
      >
        <ChevronLeftIcon />
      </AdminPaginationNavButton>
      {pageRange(pageSetLength, (pageSet - 1) * maxPageSetLength + 1).map(
        (i) => (
          <AdminPaginationNavButton
            key={i}
            to={`${getPageUrl(i)}`}
            selected={i === +page}
          >
            {i}
          </AdminPaginationNavButton>
        )
      )}
      <AdminPaginationNavButton
        className="rounded-r-md"
        to={`${getPageUrl(nextPage)}`}
        disabled={nextPage > pageCount}
      >
        <ChevronRightIcon />
      </AdminPaginationNavButton>
    </nav>
  );
};

export interface PaginationNavButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  to?: string;
  selected?: boolean;
}

const AdminPaginationNavButton: FC<PaginationNavButtonProps> = ({
  children,
  className,
  text,
  to,
  selected,
  onClick,
  ...props
}) => {
  const router = useRouter();
  return (
    <button
      className={cn(
        `grid w-10 place-items-center border p-2 text-sm font-medium disabled:text-slate-200`,
        selected
          ? "z-10 border-indigo-500 bg-indigo-50 text-indigo-600"
          : "z-0 border-gray-300 bg-white text-gray-500 hover:bg-gray-50",
        className
      )}
      onClick={to ? () => router.push(to) : onClick}
      {...props}
    >
      {text ?? children}
    </button>
  );
};

AdminPagination.Label = AdminPaginationLabel;
AdminPagination.Nav = AdminPaginationNav;
AdminPaginationNav.Button = AdminPaginationNavButton;

export { AdminPagination as Pagination };
