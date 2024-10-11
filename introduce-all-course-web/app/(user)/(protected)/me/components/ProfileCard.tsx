"use client";

import Image from "next/image";

import { useLogout } from "@/app/hooks/user/authHooks";
import { useFindMe } from "@/app/hooks/user/userHooks";
import { Button } from "@/components/ui/button";

const ProfileCard = () => {
  const { data: me } = useFindMe();
  const logout = useLogout();

  if (!me) return null;

  return (
    <div className="flex h-fit flex-col items-center space-y-4 rounded-xl bg-brand-secondary p-5 laptop:w-80 laptop:rounded-3xl laptop:p-7">
      <Image
        src={me.profile_url}
        width={80}
        height={80}
        alt="profile"
        className="rounded-full border border-slate-100"
      />
      <div className="flex flex-col items-center">
        <span className="text-lg font-semibold">{me.nickname}</span>
        <span className="text-sm text-slate-500">{me.email}</span>
      </div>
      <div className="flex w-full flex-col items-center space-y-1">
        <Button variant="secondary" className="w-full" onClick={() => logout()}>
          로그아웃
        </Button>
      </div>
    </div>
  );
};

export default ProfileCard;
