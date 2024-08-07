/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class AdminAdminsService {
  /**
   * 어드민 목록 조회
   * @param order
   * @param queryText
   * @param page
   * @param itemsPerPage
   * @returns any
   * @throws ApiError
   */
  public static getAllAdmins(
    order?: "ASC" | "DESC",
    queryText?: string,
    page: number = 1,
    itemsPerPage: number = 30
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/admin/admins",
      query: {
        order: order,
        queryText: queryText,
        page: page,
        itemsPerPage: itemsPerPage,
      },
    });
  }
}
