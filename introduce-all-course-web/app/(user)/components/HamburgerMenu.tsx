"use client";

import Logo from "@assets/logo.svg";
import { Button } from "@components/ui/button";
import { cn } from "@utils/common";
import { ChevronRightIcon, MenuIcon, X } from "lucide-react";
import Link from "next/link";

import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

type HamburgerMenuProps = {
  className?: string;
};

const HamburgerMenu = ({ className }: HamburgerMenuProps) => {
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
        <div className="absolute inset-0 z-50 h-screen w-full space-y-3 bg-white px-3 py-5">
          <div>
            <div className="mb-5 flex w-full flex-row items-center justify-between pl-2">
              <Link href="/">
                <Link href="/">
                  <Logo width={127} height={38} className="h-9" />
                </Link>
              </Link>
              <SheetClose asChild>
                <Button variant="ghost" size="icon" className="">
                  <X />
                </Button>
              </SheetClose>
            </div>
            <Link
              href="/login"
              className="mb-5 flex w-full flex-row items-center justify-between pl-3 pr-2"
            >
              <div className="font-regular text-base">로그인이 필요합니다.</div>
              <ChevronRightIcon className="" />
            </Link>
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
