/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MainBannerDto } from "../models/MainBannerDto";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class MainBannersService {
  /**
   * 메인페이지 배너 목록 조회
   * @returns MainBannerDto
   * @throws ApiError
   */
  public static getAllMainBannersWithPagination(): CancelablePromise<
    Array<MainBannerDto>
  > {
    return __request(OpenAPI, {
      method: "GET",
      url: "/main/banners",
    });
  }
}
