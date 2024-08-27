/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FreeLectureResultDto } from "../models/FreeLectureResultDto";
import type { FreeLecturesOrderBy } from "../models/FreeLecturesOrderBy";
import type { Order } from "../models/Order";
import type { PaginatedFreeLectureSummaryListDto } from "../models/PaginatedFreeLectureSummaryListDto";
import type { PaginatedFreeLectureTagListDto } from "../models/PaginatedFreeLectureTagListDto";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class FreeLecturesService {
  /**
   * 무료강의 게시글 목록 조회
   * @param order
   * @param orderBy
   * @param freeLectureTagIds
   * @param page
   * @param itemsPerPage
   * @returns PaginatedFreeLectureSummaryListDto
   * @throws ApiError
   */
  public static getAllFreeLecturesWithPagination(
    order?: Order,
    orderBy?: FreeLecturesOrderBy,
    freeLectureTagIds?: Array<number>,
    page: number = 1,
    itemsPerPage: number = 10
  ): CancelablePromise<PaginatedFreeLectureSummaryListDto> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/free-lecture/posts",
      query: {
        order: order,
        orderBy: orderBy,
        freeLectureTagIds: freeLectureTagIds,
        page: page,
        itemsPerPage: itemsPerPage,
      },
    });
  }
  /**
   * 무료강의 게시글 상세 조회
   * @param postId
   * @returns FreeLectureResultDto
   * @throws ApiError
   */
  public static getFreeLectureById(
    postId: number
  ): CancelablePromise<FreeLectureResultDto> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/free-lecture/posts/{postId}",
      path: {
        postId: postId,
      },
    });
  }
  /**
   * 무료강의 태그 목록 조회
   * @param page
   * @param itemsPerPage
   * @returns PaginatedFreeLectureTagListDto
   * @throws ApiError
   */
  public static getAllFreeLectureTagsWithPagination(
    page: number = 1,
    itemsPerPage: number = 10
  ): CancelablePromise<PaginatedFreeLectureTagListDto> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/free-lecture/categories",
      query: {
        page: page,
        itemsPerPage: itemsPerPage,
      },
    });
  }
}
