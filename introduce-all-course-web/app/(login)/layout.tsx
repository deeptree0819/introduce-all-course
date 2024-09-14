import OpenApiTokenProvider from "@components/provider/OpenApiTokenProvider";

import GlobalBanner from "../(user)/components/GlobalBanner";
import GNB from "../(user)/components/GNB";

export default function LoginLayout({
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
      {children}
    </OpenApiTokenProvider>
  );
}
