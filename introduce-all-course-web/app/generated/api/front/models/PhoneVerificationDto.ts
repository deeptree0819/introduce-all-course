/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type PhoneVerificationDto = {
  id: number;
  /**
   * 휴대폰번호
   */
  phoneNumber: string;
  /**
   * 인증완료여부
   */
  isVerified: boolean;
  /**
   * 인증완료일시
   */
  verifiedAt?: string;
  /**
   * 만료일시
   */
  expiredAt: string;
};
