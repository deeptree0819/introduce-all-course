import { OpenAPI } from "@generated/index";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

import Footer from "./components/Footer";
import GlobalBanner from "./components/GlobalBanner";
import GNB from "./components/GNB";

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
      <div className="grow">{children}</div>
      <Footer />
    </div>
  );
}
