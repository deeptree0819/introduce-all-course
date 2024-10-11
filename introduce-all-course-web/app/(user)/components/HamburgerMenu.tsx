"use client";

import Logo from "@assets/logo.png";
import { Button } from "@components/ui/button";
import { cn } from "@utils/common";
import { getCookie } from "cookies-next";
import { ChevronRightIcon, MenuIcon, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { useFindMe } from "@/app/hooks/user/userHooks";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type HamburgerMenuProps = {
  className?: string;
};

const HamburgerMenu = ({ className }: HamburgerMenuProps) => {
  const isLogin = !!getCookie("user.token");

  const { data: me } = useFindMe();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className={cn(className, "flex items-center justify-center")}
          variant="ghost"
          size="icon"
        >
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-5/6">
        <SheetTitle className="hidden">메뉴</SheetTitle>
        <div className="absolute inset-0 z-50 h-screen w-full space-y-3 bg-white px-3 py-12">
          <div>
            <div className="mb-8 flex w-full flex-row items-center justify-between pl-2">
              <Link href="/">
                <Link href="/">
                  <Image src={Logo} alt="logo" className="h-[31px] w-[127px]" />
                </Link>
              </Link>
              <SheetClose asChild>
                <Button variant="ghost" size="icon" className="">
                  <X />
                </Button>
              </SheetClose>
            </div>
            {isLogin ? (
              <SheetClose asChild>
                <Link
                  href="/me"
                  className="mb-8 flex w-full flex-row items-center space-x-2 pl-1"
                >
                  <Avatar className="size-6 border border-slate-100">
                    <AvatarImage src={me?.profile_thumbnail_url} alt="avatar" />
                    <AvatarFallback>{me?.nickname.slice(0, 1)}</AvatarFallback>
                  </Avatar>
                  <span className="text-base font-normal">{me?.nickname}</span>
                </Link>
              </SheetClose>
            ) : (
              <Link
                href="/login"
                className="mb-8 flex w-full flex-row items-center justify-between pl-3 pr-2"
              >
                <div className="text-base font-normal">
                  로그인이 필요합니다.
                </div>
                <ChevronRightIcon />
              </Link>
            )}
            <div className="flex w-full flex-col space-y-7 px-3">
              <div className="space-y-1">
                <SheetClose asChild>
                  <Link href="/event">
                    <div className="w-full text-lg font-semibold">공고소개</div>
                  </Link>
                </SheetClose>
                <Separator />
              </div>
              <div className="space-y-1">
                <SheetClose asChild>
                  <Link href="/inquiry">
                    <div className="w-full text-lg font-semibold">취업상담</div>
                  </Link>
                </SheetClose>
                <Separator />
              </div>
              <div className="space-y-1">
                <SheetClose asChild>
                  <Link href="/free-lecture">
                    <div className="w-full text-lg font-semibold">무료강의</div>
                  </Link>
                </SheetClose>
                <Separator />
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default HamburgerMenu;
