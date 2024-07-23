"use client";

import { Button } from "@components/ui/button";
import { cn } from "@utils/common";
import { MenuIcon, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Separator } from "@/components/ui/separator";

type HamburgerMenuProps = {
  className?: string;
};

const HamburgerMenu = ({ className }: HamburgerMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        className={cn(className, "flex items-center justify-center")}
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(true)}
      >
        <MenuIcon />
      </Button>
      {isOpen && (
        <div className="absolute inset-0 z-50 h-screen w-full bg-white px-8 py-2">
          <div className="flex flex-row justify-end">
            <Button
              variant="ghost"
              size="icon"
              className="right-0"
              onClick={() => setIsOpen(false)}
            >
              <X />
            </Button>
          </div>
          <div className="flex w-full flex-col space-y-7">
            <div className="space-y-1">
              <Link href="/event">
                <div className="w-full text-lg font-semibold">공고소개</div>
              </Link>
              <Separator />
            </div>
            <div className="space-y-1">
              <Link href="/inquiry">
                <div className="w-full text-lg font-semibold">취업상담</div>
              </Link>
              <Separator />
            </div>
            <div className="space-y-1">
              <Link href="/free-lecture">
                <div className="w-full text-lg font-semibold">무료강의</div>
              </Link>
              <Separator />
            </div>
            <div className="space-y-1">
              <Link href="/login">
                <div className="w-full text-lg font-semibold">로그인</div>
              </Link>
              <Separator />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HamburgerMenu;
