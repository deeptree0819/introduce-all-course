import Logo from "@assets/logo.svg";
import { buttonVariants } from "@components/ui/button";
import { cn } from "@utils/common";
import Link from "next/link";

import { Separator } from "@/components/ui/separator";

import HamburgerMenu from "./HamburgerMenu";

const GNB = () => {
  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-[1300px] flex-row items-center justify-between px-8 py-2 laptop:px-24">
        <Link href="/">
          <Logo
            width={127}
            height={38}
            className="h-9 laptop:block laptop:h-14"
          />
        </Link>

        <div className="ml-5 hidden flex-1 flex-row items-center justify-between laptop:flex">
          <div className="space-x-5">
            <Link
              href="/event"
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "rounded-lg px-3 py-2 text-base font-medium"
              )}
            >
              공고소개
            </Link>
            <Link
              href="/inquiry"
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "rounded-lg px-3 py-2 text-base font-medium"
              )}
            >
              취업상담
            </Link>
            <Link
              href="/free-lecture"
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "rounded-lg px-3 py-2 text-base font-medium"
              )}
            >
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
