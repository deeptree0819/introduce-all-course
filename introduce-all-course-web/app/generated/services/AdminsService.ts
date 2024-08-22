/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AdminDto } from "../models/AdminDto";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class AdminsService {
  /**
   * 내 정보 조회
   * @returns AdminDto
   * @throws ApiError
   */
  public static findMe(): CancelablePromise<AdminDto> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/admins/me",
    });
  }
}
