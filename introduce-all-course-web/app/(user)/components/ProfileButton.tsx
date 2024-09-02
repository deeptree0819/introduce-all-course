"use client";

import Link from "next/link";

import { useFindMe } from "@/app/hooks/user/userHooks";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

const ProfileButtonSkeleton = () => (
  <div className="flex flex-row items-center space-x-2">
    <Skeleton className="h-6 w-6 rounded-full" />
    <Skeleton className="h-4 w-20" />
  </div>
);

const ProfileButton = () => {
  const { data: me, isLoading } = useFindMe();

  return isLoading ? (
    <ProfileButtonSkeleton />
  ) : (
    <Link href="/me" className="flex flex-row items-center space-x-2">
      <Avatar className="h-6 w-6">
        <AvatarImage src={me?.profile_thumbnail_url} alt="avatar" />
        <AvatarFallback>{me?.nickname.slice(0, 1)}</AvatarFallback>
      </Avatar>
      <span className="text-base">{me?.nickname}</span>
    </Link>
  );
};

export default ProfileButton;
