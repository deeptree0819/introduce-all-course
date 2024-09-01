/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserLoginDto } from "../models/UserLoginDto";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class AuthService {
  /**
   * 로그인 및 가입
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static signIn(requestBody: UserLoginDto): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/login",
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * 내 정보 조회
   * @returns any
   * @throws ApiError
   */
  public static findMe(): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/me",
    });
  }
}
