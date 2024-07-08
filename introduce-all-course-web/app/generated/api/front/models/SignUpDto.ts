/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SignUpUserAgreementDto } from "./SignUpUserAgreementDto";

export type SignUpDto = {
  /**
   * 이메일
   */
  email: string;
  /**
   * 비밀번호
   */
  password: string;
  /**
   * 이름
   */
  name: string;
  /**
   * 휴대폰번호
   */
  phoneNumber: string;
  /**
   * 약관동의내역
   */
  userAgreements: Array<SignUpUserAgreementDto>;
  /**
   * 휴대폰번호인증코드
   */
  phoneVerificationCode: string;
};
