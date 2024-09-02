import { OpenAPI } from "@generated/index";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = getCookie("user.token", { cookies });
  OpenAPI.TOKEN = typeof token === "string" ? token : undefined;

  if (!token) redirect("/");

  return children;
}
