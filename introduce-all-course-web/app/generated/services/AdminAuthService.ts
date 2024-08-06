/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LoginResultDto } from "../models/LoginResultDto";
import type { LoginWithEmailDto } from "../models/LoginWithEmailDto";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class AdminAuthService {
  /**
   * 관리자 이메일 로그인
   * @param requestBody
   * @returns LoginResultDto
   * @throws ApiError
   */
  public static authControllerLoginByEmail(
    requestBody: LoginWithEmailDto
  ): CancelablePromise<LoginResultDto> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/admin/login",
      body: requestBody,
      mediaType: "application/json",
    });
  }
}
