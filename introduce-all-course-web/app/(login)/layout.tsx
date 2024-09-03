import { OpenAPI } from "@generated/index";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

import GlobalBanner from "../(user)/components/GlobalBanner";
import GNB from "../(user)/components/GNB";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = getCookie("user.token", { cookies });
  OpenAPI.TOKEN = typeof token === "string" ? token : undefined;

  return (
    <div className="flex min-h-screen flex-col">
      <GlobalBanner />
      <GNB />
      {children}
    </div>
  );
}
