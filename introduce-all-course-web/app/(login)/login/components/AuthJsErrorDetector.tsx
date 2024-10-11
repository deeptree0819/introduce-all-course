"use client";

import { toastError } from "@toast";
import { useGetSearchParams } from "@utils/common";

let didRender = false;

const AuthJsErrorDetector = () => {
  const { error } = useGetSearchParams();

  if (!!error && !didRender) {
    didRender = true;
    toastError("로그인에 문제가 생겼습니다.");
  }

  return <></>;
};

export default AuthJsErrorDetector;
