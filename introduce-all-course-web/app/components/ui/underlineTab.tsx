"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React, { AnchorHTMLAttributes, FC, HTMLAttributes } from "react";

export interface UnderlineTabProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}
const UnderlineTab: FC<UnderlineTabProps> & {
  Item: FC<UnderlineTabItemProps>;
} = ({ children, className, ...props }) => {
  return (
    <div {...props} className={`flex ${className}`}>
      <div className={`flex w-full`}>{children}</div>
    </div>
  );
};

interface IUnderlineTab {
  text: string;
  value?: string;
}

export interface UnderlineTabItemProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  tabItem: IUnderlineTab;
}

const UnderlineTabItem: FC<UnderlineTabItemProps> = ({ tabItem, ...props }) => {
  const { text, value } = tabItem;
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const query = Object.fromEntries(searchParams.entries());

  return (
    <Link
      href={{ pathname, query: { ...query, tab: value || text } }}
      {...props}
      className={`w-full border-b-2 px-2 py-1 text-center text-[16px]  ${
        tab === (value || text)
          ? "border-black bg-slate-50 font-bold text-black"
          : "border-slate-300 font-normal text-slate-300"
      } `}
    >
      {text}
    </Link>
  );
};

UnderlineTab.Item = UnderlineTabItem;

export { UnderlineTab, UnderlineTabItem };
