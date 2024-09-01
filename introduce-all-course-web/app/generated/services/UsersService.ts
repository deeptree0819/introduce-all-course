/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UpdateUserDto } from "../models/UpdateUserDto";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class UsersService {
  /**
   * 유저 정보 수정
   * @param userId
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static updateUser(
    userId: number,
    requestBody: UpdateUserDto
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "PATCH",
      url: "/user/{userId}",
      path: {
        userId: userId,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }
}
