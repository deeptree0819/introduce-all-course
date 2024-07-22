import Footer from "./components/Footer";
import GlobalBanner from "./components/GlobalBanner";
import GNB from "./components/GNB";

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
      <Footer />
    </div>
  );
}
