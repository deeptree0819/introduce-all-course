export interface KakaoNativeToken {
  idToken: string;
  accessToken: string;
}

export interface KakaoNativeProfile {
  email: string | null;
  nickname: string | null;
}
export interface KakaoLoginDto {
  token: KakaoNativeToken;
  profile: KakaoNativeProfile;
}
