/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AdminMeDto } from "../models/AdminMeDto";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class AdminsService {
  /**
   * 내 정보 조회
   * @returns AdminMeDto
   * @throws ApiError
   */
  public static findMe(): CancelablePromise<AdminMeDto> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/admins/me",
    });
  }
}
