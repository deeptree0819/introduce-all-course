import { OpenAPI } from "@generated/index";
import { getCookie } from "cookies-next";

import AdminModal from "./components/modal/AdminModal";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = getCookie("token");
  OpenAPI.TOKEN = typeof token === "string" ? token : undefined;

  return (
    <div>
      <AdminModal />
      {children}
    </div>
  );
}
