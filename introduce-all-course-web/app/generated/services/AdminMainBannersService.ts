/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AdminCreateMainBannerDto } from "../models/AdminCreateMainBannerDto";
import type { AdminMainBannerDto } from "../models/AdminMainBannerDto";
import type { AdminUpdateMainBannerDto } from "../models/AdminUpdateMainBannerDto";
import type { PaginatedAdminMainBannerSummaryListDto } from "../models/PaginatedAdminMainBannerSummaryListDto";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class AdminMainBannersService {
  /**
   * 메인페이지 배너 목록 조회
   * @param status
   * @param page
   * @param itemsPerPage
   * @returns PaginatedAdminMainBannerSummaryListDto
   * @throws ApiError
   */
  public static getAllMainBannersWithPagination(
    status?: "BEFORE" | "PROGRESS" | "AFTER",
    page: number = 1,
    itemsPerPage: number = 10
  ): CancelablePromise<PaginatedAdminMainBannerSummaryListDto> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/admin/main/banners",
      query: {
        status: status,
        page: page,
        itemsPerPage: itemsPerPage,
      },
    });
  }
  /**
   * 메인페이지 배너 추가
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static createMainBanner(
    requestBody: AdminCreateMainBannerDto
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/admin/main/banners",
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * 메인페이지 배너 상세 조회
   * @param mainBannerId
   * @returns AdminMainBannerDto
   * @throws ApiError
   */
  public static getMainBannerById(
    mainBannerId: number
  ): CancelablePromise<AdminMainBannerDto> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/admin/main/banners/{mainBannerId}",
      path: {
        mainBannerId: mainBannerId,
      },
    });
  }
  /**
   * 메인페이지 배너 수정
   * @param mainBannerId
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static updateMainBanner(
    mainBannerId: number,
    requestBody: AdminUpdateMainBannerDto
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "PATCH",
      url: "/admin/main/banners/{mainBannerId}",
      path: {
        mainBannerId: mainBannerId,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * 메인페이지 배너 삭제
   * @param mainBannerId
   * @returns any
   * @throws ApiError
   */
  public static deleteMainBanner(mainBannerId: number): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/admin/main/banners/{mainBannerId}",
      path: {
        mainBannerId: mainBannerId,
      },
    });
  }
}
