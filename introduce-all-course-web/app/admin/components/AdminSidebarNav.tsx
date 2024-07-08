"use client";

import { cn } from "@utils/common";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { useAdminLogout } from "@/app/hooks/admin/adminAuthHooks";

interface AdminSidebarNavProps extends React.HTMLAttributes<HTMLElement> {}

const navItems = [
  {
    title: "회원관리",
    href: "/admin/users",
    children: [{ title: "회원정보관리", href: "/admin/users" }],
  },
  {
    title: "프로모션 관리",
    href: "/admin/promotion/coupon",
    children: [{ title: "쿠폰관리", href: "/admin/promotion/coupon" }],
  },
];

export default function AdminSidebarNav({ ...props }: AdminSidebarNavProps) {
  const pathname = usePathname();
  const logout = useAdminLogout();
  return (
    <div className="h-screen w-[255px] space-y-5 border-r bg-[#F9FAFB] p-4">
      <div className="text-2xl font-extrabold">Starter</div>
      <div className="flex h-[70px] w-full flex-col justify-center rounded-md bg-white px-3">
        <div className="text-[14px] font-bold text-gray-900">관리자명</div>
        <div className="text-[14px] text-gray-700">example@example.com</div>
      </div>
      <nav className="flex flex-col" {...props}>
        {navItems.map((item) => (
          <React.Fragment key={item.href}>
            <Link
              href={item.href}
              className={cn("mt-1 w-full px-3 py-3 text-sm font-semibold")}
            >
              {item.title}
            </Link>
            <div className="flex flex-col space-y-1">
              {item.children &&
                item.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className={cn(
                      "w-full px-6 py-1 text-sm text-slate-500",
                      pathname.includes(child.href) &&
                        "rounded-md bg-slate-900 text-white"
                    )}
                  >
                    {child.title}
                  </Link>
                ))}
            </div>
          </React.Fragment>
        ))}
        <button
          className="flex w-full justify-start p-3 text-sm font-semibold"
          onClick={() => logout()}
        >
          로그아웃
        </button>
      </nav>
    </div>
  );
}
