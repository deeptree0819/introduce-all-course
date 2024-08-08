/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AdminDto } from "../models/AdminDto";
import type { PaginatedAdminListDto } from "../models/PaginatedAdminListDto";
import type { UpdateAdminDto } from "../models/UpdateAdminDto";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class AdminAdminsService {
  /**
   * 어드민 목록 조회
   * @param role
   * @param queryText
   * @param page
   * @param itemsPerPage
   * @returns PaginatedAdminListDto
   * @throws ApiError
   */
  public static getAllAdminsWithPagination(
    role?: "SUPER" | "MANAGER",
    queryText?: string,
    page: number = 1,
    itemsPerPage: number = 30
  ): CancelablePromise<PaginatedAdminListDto> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/admin/admins",
      query: {
        role: role,
        queryText: queryText,
        page: page,
        itemsPerPage: itemsPerPage,
      },
    });
  }
  /**
   * 유저 상세 조회
   * @param adminId
   * @returns AdminDto
   * @throws ApiError
   */
  public static getUserById(adminId: number): CancelablePromise<AdminDto> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/admin/admins/{adminId}",
      path: {
        adminId: adminId,
      },
    });
  }
  /**
   * 유저 정보 수정
   * @param adminId
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static updateUser(
    adminId: number,
    requestBody: UpdateAdminDto
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "PATCH",
      url: "/admin/admins/{adminId}",
      path: {
        adminId: adminId,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }
}
