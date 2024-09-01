import { OpenAPI } from "@generated/index";
import { getCookie } from "cookies-next";

import Footer from "./components/Footer";
import GlobalBanner from "./components/GlobalBanner";
import GNB from "./components/GNB";

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
      <div className="grow">{children}</div>
      <Footer />
    </div>
  );
}
