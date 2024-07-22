import GlobalBanner from "./components/GlobalBanner";
import GNB from "./components/GNB";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <GlobalBanner />
      <GNB />
      {children}
    </>
  );
}
