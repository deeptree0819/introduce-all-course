import OpenApiTokenProvider from "@components/provider/OpenApiTokenProvider";

import Footer from "./components/Footer";
import GlobalBanner from "./components/GlobalBanner";
import GNB from "./components/GNB";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <OpenApiTokenProvider
      className="flex min-h-screen flex-col"
      tokenName="user.token"
    >
      <GlobalBanner />
      <GNB />
      <div className="grow">{children}</div>
      <Footer />
    </OpenApiTokenProvider>
  );
}
