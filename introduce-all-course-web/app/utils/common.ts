import { DefaultService } from "@generated/index";
import { InfiniteData } from "@tanstack/react-query";
import { type ClassValue, clsx } from "clsx";
import { usePathname, useSearchParams } from "next/navigation";
import { ParsedUrlQueryInput } from "querystring";
import { useCallback, useMemo } from "react";
import { twMerge } from "tailwind-merge";

import { Paginated } from "../types/common";

/**
 * 클래스 값들을 결합하고 병합합니다.
 *
 * 1. clsx: 동적으로 클래스 문자열을 결합합니다.
 * 2. tailwind-merge: Tailwind CSS 클래스를 병합합니다.
 *
 * 예시:
 * isActive가 true일 경우,
 * cn('bg-white', isActive && 'text-black', 'p-4 p-2') -> 'bg-white text-black p-2'
 *
 * @param inputs - 결합할 클래스 값들의 배열.
 * @returns 병합된 클래스 문자열.
 */

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export function pageRange(length: number, start = 0) {
  return Array.from({ length }, (_, i) => i + start);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getNextPageParam(lastPage: Paginated<any>) {
  const {
    pagination: { currentPage, totalPage },
  } = lastPage;
  const nextPage = currentPage + 1;
  return nextPage <= totalPage ? nextPage : undefined;
}

export const useCreateQueryParams = () => {
  const pathname = usePathname();

  return useCallback(
    (items: Record<string, string | undefined>) => {
      const params = new URLSearchParams();
      for (const [key, value] of Object.entries(items)) {
        if (value) {
          params.set(key, value);
        }
      }
      return `${pathname}?${params.toString()}`;
    },
    [pathname]
  );
};

export const useAppendQueryParams = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams()!;

  return useCallback(
    (items: Record<string, string | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(items)) {
        if (value) {
          params.set(key, value);
        }
      }
      return `${pathname}?${params.toString()}`;
    },
    [searchParams, pathname]
  );
};

export const useUpdateQueryParams = () => {
  return (newParams: ParsedUrlQueryInput) => {
    const currentQuery = new URLSearchParams(window.location.search);
    Object.keys(newParams).forEach((key) => {
      currentQuery.set(key, newParams[key] as string);
    });

    return `${window.location.pathname}?${currentQuery.toString()}`;
  };
};

export const useGetSearchParams = () => {
  const searchParams = useSearchParams();
  return Object.fromEntries(searchParams);
};

export type PaginatedList<T, U> = {
  items: Array<T>;
  pagination: U;
};
export const useFlatInfiniteData = <T, U>(
  data: InfiniteData<PaginatedList<T, U>> | undefined
): Array<T> => {
  return useMemo(() => {
    return data?.pages.flatMap((page) => page.items) || [];
  }, [data]);
};

export const getEnumIfExists = <T>(
  string: string,
  enumObject: object
): T | undefined => {
  return (Object.values(enumObject) as string[]).includes(string)
    ? (string as T)
    : undefined;
};

type getUploadURLParams = {
  tag: string;
  contentType: string;
  fileName: string;
};

export const getUploadUrl = async ({
  tag,
  contentType,
  fileName,
}: getUploadURLParams) => {
  return await DefaultService.getUploadUrl(tag, contentType, fileName);
};
