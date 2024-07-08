/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LoginResultDto } from "../models/LoginResultDto";
import type { SignUpDto } from "../models/SignUpDto";
import type { UserMeDto } from "../models/UserMeDto";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class UsersService {
  /**
   * 내 정보 조회
   * @returns UserMeDto
   * @throws ApiError
   */
  public static findMe(): CancelablePromise<UserMeDto> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/users/me",
    });
  }

  /**
   * 회원가입
   * @param requestBody
   * @returns LoginResultDto
   * @throws ApiError
   */
  public static signup(
    requestBody: SignUpDto
  ): CancelablePromise<LoginResultDto> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/users/signup",
      body: requestBody,
      mediaType: "application/json",
    });
  }
}
