import { OpenAPI } from "@generated/index";
import { getCookie } from "cookies-next";

import GlobalBanner from "../(user)/components/GlobalBanner";
import GNB from "../(user)/components/GNB";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = getCookie("authjs.session-token");
  OpenAPI.TOKEN = JSON.stringify({
    token: typeof token === "string" ? token : undefined,
    provider: "kakao",
  });

  return (
    <div className="flex min-h-screen flex-col">
      <GlobalBanner />
      <GNB />
      {children}
    </div>
  );
}
