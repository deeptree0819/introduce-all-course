/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PaginatedAdminListDto } from "../models/PaginatedAdminListDto";
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
}
