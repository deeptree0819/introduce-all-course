"use client";

import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { deleteCookie, getCookie } from "cookies-next";
import React, { useEffect } from "react";

import { ApiError, OpenAPI } from "@/app/generated";

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
              }
            }
          },
        }),
      })
  );

  const setToken = () => {
    const adminToken = getCookie("adminToken");
    const token = getCookie("token");

    if (window.location.pathname.includes("/admin")) {
      OpenAPI.TOKEN = typeof adminToken === "string" ? adminToken : undefined;
    } else {
      OpenAPI.TOKEN = typeof token === "string" ? token : undefined;
    }
  };

  useEffect(() => {
    setToken();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;
