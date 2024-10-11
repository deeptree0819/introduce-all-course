import OpenApiTokenProvider from "@components/provider/OpenApiTokenProvider";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function UserProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = getCookie("user.token", { cookies });
  if (!token) redirect("/");

  return (
    <OpenApiTokenProvider tokenName="user.token">
      {children}
    </OpenApiTokenProvider>
  );
}
