"use client";

import { cn } from "@utils/common";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { useAdminLogout } from "@/app/hooks/admin/adminAuthHooks";

interface AdminSidebarNavProps extends React.HTMLAttributes<HTMLElement> {}

const navItems = [
  {
    title: "회원",
    href: "/admin/users",
    children: [
      { title: "회원정보 관리", href: "/admin/users" },
      { title: "어드민 관리", href: "/admin/admins" },
    ],
  },
  {
    title: "메인페이지",
    href: "/admin/main/banners",
    children: [{ title: "메인페이지 배너 관리", href: "/admin/main/banners" }],
  },
  {
    title: "공고소개",
    href: "/admin/events/posts",
    children: [
      { title: "게시글 관리", href: "/admin/events/posts" },
      { title: "공고분야 관리", href: "/admin/events/categories" },
    ],
  },
  {
    title: "취업상담",
    href: "/admin/inquiry/form-links",
    children: [
      { title: "상담폼 링크 관리", href: "/admin/inquiry/form-links" },
    ],
  },
  {
    title: "무료강의",
    href: "/admin/free-lecture/posts",
    children: [
      { title: "게시글 관리", href: "/admin/free-lecture/posts" },
      { title: "태그 관리", href: "/admin/free-lecture/categories" },
    ],
  },
];

export default function AdminSidebarNav({ ...props }: AdminSidebarNavProps) {
  const pathname = usePathname();
  const logout = useAdminLogout();
  return (
    <div className="z-10 flex h-screen w-[255px] flex-col justify-between space-y-5 border-r bg-[#F9FAFB] p-4">
      <div className="space-y-3">
        <div className="text-2xl font-extrabold">로봇에 풍덩</div>
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
        </nav>
      </div>
      <button
        className="flex w-full justify-start p-3 text-sm font-semibold"
        onClick={() => logout()}
      >
        로그아웃
      </button>
    </div>
  );
}
