/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateFreeLectureDto } from "../models/CreateFreeLectureDto";
import type { CreateFreeLectureTagDto } from "../models/CreateFreeLectureTagDto";
import type { FreeLectureDto } from "../models/FreeLectureDto";
import type { FreeLectureResultDto } from "../models/FreeLectureResultDto";
import type { FreeLecturesOrderBy } from "../models/FreeLecturesOrderBy";
import type { FreeLectureTagDto } from "../models/FreeLectureTagDto";
import type { Order } from "../models/Order";
import type { PaginatedFreeLectureListDto } from "../models/PaginatedFreeLectureListDto";
import type { PaginatedFreeLectureTagListDto } from "../models/PaginatedFreeLectureTagListDto";
import type { UpdateFreeLectureDto } from "../models/UpdateFreeLectureDto";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class AdminFreeLecturesService {
  /**
   * 무료강의 게시글 목록 조회
   * @param order
   * @param orderBy
   * @param queryText
   * @param freeLectureTagId
   * @param page
   * @param itemsPerPage
   * @returns PaginatedFreeLectureListDto
   * @throws ApiError
   */
  public static getAllFreeLecturesWithPagination(
    order?: Order,
    orderBy?: FreeLecturesOrderBy,
    queryText?: string,
    freeLectureTagId?: string,
    page: number = 1,
    itemsPerPage: number = 30
  ): CancelablePromise<PaginatedFreeLectureListDto> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/admin/free-lecture/posts",
      query: {
        order: order,
        orderBy: orderBy,
        queryText: queryText,
        freeLectureTagId: freeLectureTagId,
        page: page,
        itemsPerPage: itemsPerPage,
      },
    });
  }
  /**
   * 무료강의 게시글 작성
   * @param requestBody
   * @returns FreeLectureDto
   * @throws ApiError
   */
  public static createFreeLecture(
    requestBody: CreateFreeLectureDto
  ): CancelablePromise<FreeLectureDto> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/admin/free-lecture/posts",
      body: requestBody,
      mediaType: "application/json",
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
      url: "/admin/free-lecture/posts/{postId}",
      path: {
        postId: postId,
      },
    });
  }
  /**
   * 무료강의 게시글 수정
   * @param postId
   * @param requestBody
   * @returns FreeLectureResultDto
   * @throws ApiError
   */
  public static updateFreeLecture(
    postId: number,
    requestBody: UpdateFreeLectureDto
  ): CancelablePromise<FreeLectureResultDto> {
    return __request(OpenAPI, {
      method: "PATCH",
      url: "/admin/free-lecture/posts/{postId}",
      path: {
        postId: postId,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * 무료강의 게시글 삭제
   * @param postId
   * @returns any
   * @throws ApiError
   */
  public static deleteFreeLecture(postId: number): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/admin/free-lecture/posts/{postId}",
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
    itemsPerPage: number = 30
  ): CancelablePromise<PaginatedFreeLectureTagListDto> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/admin/free-lecture/categories",
      query: {
        page: page,
        itemsPerPage: itemsPerPage,
      },
    });
  }
  /**
   * 무료강의 태그 등록
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static createFreeLectureTag(
    requestBody: CreateFreeLectureTagDto
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/admin/free-lecture/categories",
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * 무료강의 태그 상세 조회
   * @param freeLectureTagId
   * @returns FreeLectureTagDto
   * @throws ApiError
   */
  public static getFreeLectureTagById(
    freeLectureTagId: number
  ): CancelablePromise<FreeLectureTagDto> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/admin/free-lecture/categories/{FreeLectureTagId}",
      path: {
        FreeLectureTagId: freeLectureTagId,
      },
    });
  }
  /**
   * 무료강의 태그 삭제
   * @param freeLectureTagId
   * @returns any
   * @throws ApiError
   */
  public static deleteFreeLectureTag(
    freeLectureTagId: number
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/admin/free-lecture/categories/{FreeLectureTagId}",
      path: {
        FreeLectureTagId: freeLectureTagId,
      },
    });
  }
  /**
   * 무료강의 태그 게시글수 조회
   * @param freeLectureTagId
   * @returns number
   * @throws ApiError
   */
  public static getFreeLectureTagPostCount(
    freeLectureTagId: number
  ): CancelablePromise<number> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/admin/free-lecture/categories/{FreeLectureTagId}/postcount",
      path: {
        FreeLectureTagId: freeLectureTagId,
      },
    });
  }
}
