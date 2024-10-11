import { AuthService, OpenAPI, UserLoginDto } from "@generated/index";
import { setCookie } from "cookies-next";
import { cookies } from "next/headers";
import NextAuth from "next-auth";
import Kakao, { KakaoProfile } from "next-auth/providers/kakao";

declare module "next-auth" {
  interface Profile extends KakaoProfile {}
  interface User {
    deleted: boolean;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Kakao],
  pages: {
    error: "/login",
  },
  callbacks: {
    jwt: async ({ token }) => {
      setCookie("user.token", OpenAPI.TOKEN, {
        cookies,
        maxAge: 60 * 60 * 24 * 30,
        expires: new Date(Date.now() + 60 * 60 * 24 * 30 * 1000),
      });

      return token;
    },
    signIn: async ({ profile, account }) => {
      if (!profile || !profile.kakao_account) return false;

      OpenAPI.TOKEN = JSON.stringify({
        token: account?.access_token ?? "",
        provider: "kakao",
      });

      const { kakao_account } = profile;

      try {
        const recoveryToken = await AuthService.signIn({
          kakao_id: !!profile?.id ? +profile.id : 0,
          email: kakao_account.email ?? "",
          nickname: kakao_account.profile?.nickname ?? "",
          profile_url: kakao_account.profile?.profile_image_url ?? "",
          profile_thumbnail_url:
            kakao_account.profile?.thumbnail_image_url ?? "",
          user_name: kakao_account.name ?? "",
          birthyear: kakao_account.birthyear ?? "",
          gender: kakao_account.gender?.toUpperCase() as UserLoginDto.gender,
          phone_number: kakao_account.phone_number ?? "",
        });

        if (!recoveryToken) return true;

        setCookie("recovery_token", recoveryToken, {
          cookies,
          maxAge: 60 * 60 * 1,
          expires: new Date(Date.now() + 60 * 60 * 1 * 1000),
        });

        return "/deleted-user";
      } catch (error) {
        throw error;
      }
    },
  },
});
