import Logo from "@assets/logo.svg";
import { buttonVariants } from "@components/ui/button";
import { cn } from "@utils/common";
import Link from "next/link";

import { Separator } from "@/components/ui/separator";

import HamburgerMenu from "./HamburgerMenu";

const GNB = () => {
  return (
    <header className="sticky top-0 z-20 bg-white">
      <nav className="flex flex-row items-center justify-between px-8 py-2 laptop:px-28">
        <Link href="/">
          <Logo width={127} height={38} className="laptop:block" />
        </Link>

        <div className="ml-8 hidden flex-1 flex-row items-center justify-between laptop:flex">
          <div className="space-x-8">
            <Link href="/event" className="text-lg font-semibold">
              공고소개
            </Link>
            <Link href="/inquiry" className="text-lg font-semibold">
              취업상담
            </Link>
            <Link href="/free-lecture" className="text-lg font-semibold">
              무료강의
            </Link>
          </div>

          <Link
            href="/login"
            className={cn(
              buttonVariants({
                variant: "outline",
                className: "border-brand text-brand hover:text-brand",
              })
            )}
          >
            로그인
          </Link>
        </div>

        <HamburgerMenu className="block laptop:hidden" />
      </nav>
      <Separator />
    </header>
  );
};

export default GNB;
