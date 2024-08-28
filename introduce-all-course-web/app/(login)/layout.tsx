import GlobalBanner from "../(user)/components/GlobalBanner";
import GNB from "../(user)/components/GNB";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <GlobalBanner />
      <GNB />
      <div className="grow">{children}</div>
    </div>
  );
}
