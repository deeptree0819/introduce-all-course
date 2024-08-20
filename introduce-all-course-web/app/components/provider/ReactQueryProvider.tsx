"use client";

import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React from "react";

import { ApiError, OpenAPI } from "@/app/generated";

interface ReactQueryProviderProps {
  children: React.ReactNode;
}

const ReactQueryProvider = ({ children }: ReactQueryProviderProps) => {
  const { push } = useRouter();
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (error) => {
            if ("status" in (error as ApiError)) {
              if ((error as ApiError).status === 401) {
                queryClient.clear();
                deleteCookie("token");
                OpenAPI.TOKEN = "";
                push("/login");
              }
            }
          },
        }),
      })
  );

  const token = getCookie("token");

  OpenAPI.TOKEN = typeof token === "string" ? token : undefined;

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;
