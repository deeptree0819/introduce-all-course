/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LoginResultDto } from "../models/LoginResultDto";
import type { LoginWithEmailDto } from "../models/LoginWithEmailDto";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class AuthService {
  /**
   * 로그인
   * @param requestBody
   * @returns LoginResultDto
   * @throws ApiError
   */
  public static loginByEmail(
    requestBody: LoginWithEmailDto
  ): CancelablePromise<LoginResultDto> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/auth/login",
      body: requestBody,
      mediaType: "application/json",
    });
  }
}
