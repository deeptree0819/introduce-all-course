/* eslint-disable @typescript-eslint/no-explicit-any */
import { isMobile } from "react-device-detect";

import { AppleRequestResponse } from "../types/apple";
import { KakaoLoginDto } from "../types/kakao";

export enum Action {
  ERROR = "error",
  WINDOW_OPEN = "windowOpen",
  KAKAO_LOGIN = "kakaoLogin",
  APPLE_LOGIN = "appleLogin",
}
interface Command {
  kind?: "webview";
  action: Exclude<
    keyof typeof Bridge,
    "prototype" | "os" | "postMessage" | "handleMessageEvent"
  >;
  value?: any;
}

function tryParseJSON(jsonString: any) {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    return null;
  }
}

export class Bridge {
  static os: string;

  static postMessage(action: Action, value?: any) {
    if (typeof window === "undefined") {
      return;
    }
    const data = JSON.stringify({ action, value });
    (window as any).ReactNativeWebView?.postMessage(data);
  }

  static handleMessageEvent({ data }: MessageEvent) {
    const command = tryParseJSON(data) as Command;
    if (command?.kind !== "webview") return;
    if (Bridge[command.action]) {
      Bridge[command.action](command.value);
    } else {
      Bridge.postMessage(
        Action.ERROR,
        `(RN -> WebView) Invalid action: ${data}`
      );
    }
  }
  static log(value: any) {
    console.log(value);
  }

  static windowOpen(url: string) {
    if (isMobile && window.isWebview) {
      this.postMessage(Action.WINDOW_OPEN, url);
      return;
    }
    window.open(url, "_blank");
  }

  // 필요시 앱 카카오 로그인 구현
  static kakaoLogin(value: KakaoLoginDto) {
    // const {
    //   token: { idToken },
    // } = value;
    // AuthService.loginByKakao({
    //   idToken,
    // })
    //   .then(async (data: LoginResultDto) => {
    //     Bridge.postMessage(Action.LOGIN_USER, data.token);
    //     OpenAPI.TOKEN = data.token;
    //     setCookie("token", data.token, {
    //       maxAge: 60 * 60 * 24 * 30,
    //       expires: new Date(Date.now() + 60 * 60 * 24 * 30 * 1000),
    //     });
    //     toastSuccess("로그인에 성공했습니다.");
    //     Bridge.kakaoLoginSuccess();
    //   })
    //   .catch(() => {
    //     Bridge.kakaoLoginFail(value);
    //   });
  }
  static kakaoLoginSuccess() {
    // 선언은 kakaoLogin 호출하는 곳에서 재정의
  }

  static kakaoLoginFail(value: KakaoLoginDto) {
    // 선언은 kakaoLogin 호출하는 곳에서 재정의
  }

  // 필요시 앱 애플 로그인 구현
  static appleLogin(value: AppleRequestResponse) {
    // const { identityToken } = value;
    // if (!identityToken) {
    //   toastError("로그인에 실패했습니다.");
    //   return;
    // }
    // AuthService.loginByApple({
    //   idToken: identityToken,
    // })
    //   .then(async (data: LoginResultDto) => {
    //     Bridge.postMessage(Action.LOGIN_USER, data.token);
    //     OpenAPI.TOKEN = data.token;
    //     setCookie("token", data.token, {
    //       maxAge: 60 * 60 * 24 * 30,
    //       expires: new Date(Date.now() + 60 * 60 * 24 * 30 * 1000),
    //     });
    //     toastSuccess("로그인에 성공했습니다.");
    //     Bridge.appleLoginSuccess();
    //   })
    //   .catch(() => {
    //     Bridge.saveAppleUserInStore(value);
    //     Bridge.appleLoginFail(value);
    //   });
  }

  static saveAppleUserInStore(value: AppleRequestResponse) {
    // 선언은 appleLogin 호출하는 곳에서 재정의
  }

  static appleLoginFail(value: AppleRequestResponse) {
    // 선언은 appleLogin 호출하는 곳에서 재정의
  }

  static appleLoginSuccess() {
    // 선언은 appleLogin 호출하는 곳에서 재정의
  }
}

// @ts-ignore
typeof document !== "undefined" &&
  // @ts-ignore
  document.addEventListener("message", Bridge.handleMessageEvent);
typeof window !== "undefined" &&
  window.addEventListener("message", Bridge.handleMessageEvent);
