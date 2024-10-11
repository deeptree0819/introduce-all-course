"use client";

import { Button } from "@components/ui/button";
import { getCookie } from "cookies-next";

import { useUserRecover } from "@/app/hooks/user/authHooks";

const DeletedUserPage = () => {
  const recoveryToken = getCookie("recovery_token") as string;

  const { mutate: recoverUser } = useUserRecover({
    recovery_token: recoveryToken,
  });

  return (
    <div className="mt-20 flex flex-col items-center gap-4">
      <div className="text-2xl font-semibold">탈퇴한 회원입니다.</div>
      <div className="text-base text-gray-500">계정을 복구하시겠습니까?</div>
      <Button onClick={() => recoverUser()}>계정 복구하기</Button>
    </div>
  );
};

export default DeletedUserPage;
