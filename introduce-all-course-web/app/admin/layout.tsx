import OpenApiTokenProvider from "@components/provider/OpenApiTokenProvider";

import AdminModal from "./components/modal/AdminModal";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <OpenApiTokenProvider tokenName="token">
      <AdminModal />
      {children}
    </OpenApiTokenProvider>
  );
}
