export {};

declare global {
  interface KakaoUserResponse {
    id: string;
    connected_at: string;
    kakao_account: {
      email: string;
      enmail_needs_agreement: boolean;
      has_email: boolean;
      is_email_valid: boolean;
      is_email_verified: boolean;
      profile: {
        nickname: string;
      };
    };
  }
  interface ImportResponsePayDto {
    imp_uid: string;
    merchant_uid: string;
    error_msg?: string;
  }

  interface AppleUserResponse {
    authorization: {
      code: string;
      id_token: string;
      state: string;
    };
    user: {
      email: string;
      name: {
        firstName: string;
        lastName: string;
      };
    };
  }
  interface Window {
    IMP: {
      init: (impId: string) => void;
      request_pay(
        param: {
          pg: string;
          pay_method: string;
          merchant_uid: string;
          currency: string;
          amount: number;
          notice_url: string;
          name?: string;
          buyer_email?: string;
          buyer_name?: string;
          buyer_tel?: string;
          buyer_addr?: string;
          buyer_postcode?: string;
          m_redirect_url?: string;
          locale?: string;
        },
        callback?: (rsp: ImportResponsePayDto) => void
      ): void;
    };
    isWebview: boolean;
    Kakao: {
      init: (key: string | undefined) => void;
      isInitialized: () => boolean;
      Auth: {
        setAccessToken: (token: string) => void;
      };
      API: {
        request: (options: { url: string }) => Promise<KakaoUserResponse>;
      };
      Link: {
        sendDefault: (params: {
          objectType: string;
          content: {
            title: string;
            imageUrl: string;
            link: {
              mobileWebUrl: string;
              webUrl: string;
            };
            imageWidth?: number;
            imageHeight?: number;
            description?: string;
          };
          social?: {
            likeCount?: number;
            commentCount?: number;
            sharedCount?: number;
            viewCount?: number;
            subscriberCount?: number;
          };
          buttons?: {
            title: string;
            link: {
              androidExecutionParams?: string;
              iosExecutionParams?: string;
            };
          }[];
        }) => void;
      };
    };
    AppleID: {
      auth: {
        init: (params: {
          clientId: string | undefined;
          scope: string;
          redirectURI: string | undefined;
          usePopup: boolean;
        }) => void;
        signIn: () => Promise<AppleUserResponse>;
      };
    };
  }
}
