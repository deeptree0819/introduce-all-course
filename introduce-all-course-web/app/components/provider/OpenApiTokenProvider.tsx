"use client";

import { OpenAPI } from "@generated/index";
import { getCookie } from "cookies-next";

type OpenApiTokenProviderProps = {
  tokenName: string;
  children?: React.ReactNode;
  className?: string;
};

const OpenApiTokenProvider = ({
  tokenName,
  children,
  className,
}: OpenApiTokenProviderProps) => {
  const token = getCookie(tokenName);
  OpenAPI.TOKEN = typeof token === "string" ? token : undefined;

  return <div className={className}>{children}</div>;
};

export default OpenApiTokenProvider;
