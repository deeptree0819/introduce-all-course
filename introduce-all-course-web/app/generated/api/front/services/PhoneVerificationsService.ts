/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PhoneVerificationDto } from "../models/PhoneVerificationDto";
import type { SendSignUpPhoneVerificationDto } from "../models/SendSignUpPhoneVerificationDto";
import type { VerifyPhoneVerificationDto } from "../models/VerifyPhoneVerificationDto";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class PhoneVerificationsService {
  /**
   * 회원가입 휴대폰인증번호 발송
   * @param requestBody
   * @returns PhoneVerificationDto
   * @throws ApiError
   */
  public static sendSignUpPhoneVerification(
    requestBody: SendSignUpPhoneVerificationDto
  ): CancelablePromise<PhoneVerificationDto> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/users/signup/phone-verifications",
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * 회원가입 휴대폰인증 코드확인
   * @param requestBody
   * @returns PhoneVerificationDto
   * @throws ApiError
   */
  public static verifyPhoneVerification(
    requestBody: VerifyPhoneVerificationDto
  ): CancelablePromise<PhoneVerificationDto> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/phone-verifications/verify",
      body: requestBody,
      mediaType: "application/json",
    });
  }
}
