import Logo from "@assets/logo.png";
import { buttonVariants } from "@components/ui/button";
import { cn } from "@utils/common";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

import { Separator } from "@/components/ui/separator";

import HamburgerMenu from "./HamburgerMenu";
import ProfileButton from "./ProfileButton";

const GNB = () => {
  const isLogin = !!getCookie("user.token", { cookies });

  return (
    <header className="sticky top-0 z-20 bg-white/70 backdrop-blur-md">
      <nav className="mx-auto flex max-w-[1300px] flex-row items-center justify-between px-4 py-3 laptop:px-24 laptop:py-4">
        <Link href="/" className="cursor-pointer">
          <Image src={Logo} alt="logo" className="h-[31px] w-[130px]" />
        </Link>

        <div className="ml-5 hidden flex-1 flex-row items-center justify-between laptop:flex">
          <div className="space-x-5">
            <Link
              href="/event"
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "rounded-lg px-3 py-2 text-base font-normal"
              )}
            >
              커리큘럼
            </Link>
            <Link
              href="/inquiry"
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "rounded-lg px-3 py-2 text-base font-normal"
              )}
            >
              취업상담
            </Link>
            <Link
              href="/free-lecture"
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "rounded-lg px-3 py-2 text-base font-normal"
              )}
            >
              무료강의
            </Link>
          </div>

          {isLogin ? (
            <ProfileButton />
          ) : (
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
          )}
        </div>

        <HamburgerMenu className="block laptop:hidden" />
      </nav>
      <Separator />
    </header>
  );
};

export default GNB;
