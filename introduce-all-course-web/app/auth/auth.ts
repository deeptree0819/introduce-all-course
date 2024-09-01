import { AuthService, OpenAPI, UserLoginDto } from "@generated/index";
import NextAuth from "next-auth";
import Kakao, { KakaoProfile } from "next-auth/providers/kakao";

declare module "next-auth" {
  interface Profile extends KakaoProfile {}
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Kakao],
  callbacks: {
    jwt: async ({ token, profile, trigger, account }) => {
      if (
        trigger !== "signIn" ||
        !profile ||
        !profile.kakao_account ||
        !account
      ) {
        return null;
      }

      const { kakao_account } = profile;

      OpenAPI.TOKEN = JSON.stringify({
        token: account?.access_token ?? "",
        provider: "kakao",
      });

      AuthService.signIn({
        kakao_id: !!profile?.id ? +profile.id : 0,
        email: kakao_account.email ?? "",
        nickname: kakao_account.profile?.nickname ?? "",
        profile_url: kakao_account.profile?.profile_image_url ?? "",
        profile_thumbnail_url: kakao_account.profile?.thumbnail_image_url ?? "",
        user_name: kakao_account.name ?? "",
        birthyear: kakao_account.birthyear ?? "",
        gender: kakao_account.gender?.toUpperCase() as UserLoginDto.gender,
        phone_number: kakao_account.phone_number ?? "",
      });

      return token;
    },
  },
});
