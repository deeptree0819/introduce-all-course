"use client";

import { OpenAPI as AdminOpenAPI } from "@generated/admin/core/OpenAPI";
import { ApiError } from "@generated/front/core/ApiError";
import { OpenAPI } from "@generated/front/core/OpenAPI";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { deleteCookie, getCookie } from "cookies-next";
import React from "react";

interface ReactQueryProviderProps {
  children: React.ReactNode;
}

const ReactQueryProvider = ({ children }: ReactQueryProviderProps) => {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (error) => {
            if ("status" in (error as ApiError)) {
              if ((error as ApiError).status === 401) {
                queryClient.clear();
                deleteCookie("token");
                deleteCookie("adminToken");
                OpenAPI.TOKEN = "";
                AdminOpenAPI.TOKEN = "";
              }
            }
          },
        }),
      })
  );

  const adminToken = getCookie("adminToken");
  const token = getCookie("token");
  AdminOpenAPI.TOKEN = typeof adminToken === "string" ? adminToken : undefined;
  OpenAPI.TOKEN = typeof token === "string" ? token : undefined;

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;
