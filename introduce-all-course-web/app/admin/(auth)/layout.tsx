import { useOnlyAdminRoute } from "@lib/auth";

import AdminSidebarNav from "../components/AdminSidebarNav";

interface Props {
  children: React.ReactNode;
}

export default function AdminAuthLayout(props: Props) {
  const { children } = props;
  useOnlyAdminRoute();
  return (
    <div className="flex">
      <AdminSidebarNav />
      <div className="h-screen flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}
