"use client";

import { cn } from "@utils/common";
import Link from "next/link";

import { useFindMe } from "@/app/hooks/user/userHooks";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";

const ProfileButton = () => {
  const { data: me } = useFindMe();

  if (!me) return null;

  return (
    <Link
      href="/me"
      className={cn(
        buttonVariants({ variant: "ghost", size: "sm" }),
        "flex flex-row items-center space-x-2"
      )}
    >
      <Avatar className="size-6 border border-slate-100">
        <AvatarImage src={me?.profile_thumbnail_url} alt="avatar" />
        <AvatarFallback>{me?.nickname.slice(0, 1)}</AvatarFallback>
      </Avatar>
      <span className="text-base font-normal">{me?.nickname}</span>
    </Link>
  );
};

export default ProfileButton;
