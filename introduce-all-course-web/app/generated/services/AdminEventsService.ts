/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AdminCreateEventCategoryDto } from "../models/AdminCreateEventCategoryDto";
import type { AdminCreateEventDto } from "../models/AdminCreateEventDto";
import type { AdminDeleteEventCategoryDto } from "../models/AdminDeleteEventCategoryDto";
import type { AdminEventCategoryDto } from "../models/AdminEventCategoryDto";
import type { AdminEventResultDto } from "../models/AdminEventResultDto";
import type { AdminUpdateEventDto } from "../models/AdminUpdateEventDto";
import type { EventsOrderBy } from "../models/EventsOrderBy";
import type { Order } from "../models/Order";
import type { PaginatedAdminEventCategoryListDto } from "../models/PaginatedAdminEventCategoryListDto";
import type { PaginatedAdminEventSummaryListDto } from "../models/PaginatedAdminEventSummaryListDto";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class AdminEventsService {
  /**
   * 커리큘럼 게시글 목록 조회
   * @param order
   * @param orderBy
   * @param queryText
   * @param eventCategoryId
   * @param page
   * @param itemsPerPage
   * @returns PaginatedAdminEventSummaryListDto
   * @throws ApiError
   */
  public static getAllEventsWithPagination(
    order?: Order,
    orderBy?: EventsOrderBy,
    queryText?: string,
    eventCategoryId?: string,
    page: number = 1,
    itemsPerPage: number = 10
  ): CancelablePromise<PaginatedAdminEventSummaryListDto> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/admin/events/posts",
      query: {
        order: order,
        orderBy: orderBy,
        queryText: queryText,
        eventCategoryId: eventCategoryId,
        page: page,
        itemsPerPage: itemsPerPage,
      },
    });
  }
  /**
   * 커리큘럼 게시글 작성
   * @param requestBody
   * @returns AdminEventResultDto
   * @throws ApiError
   */
  public static createEvent(
    requestBody: AdminCreateEventDto
  ): CancelablePromise<AdminEventResultDto> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/admin/events/posts",
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * 커리큘럼 게시글 상세 조회
   * @param eventId
   * @returns AdminEventResultDto
   * @throws ApiError
   */
  public static getEventById(
    eventId: number
  ): CancelablePromise<AdminEventResultDto> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/admin/events/posts/{eventId}",
      path: {
        eventId: eventId,
      },
    });
  }
  /**
   * 커리큘럼 게시글 수정
   * @param eventId
   * @param requestBody
   * @returns AdminEventResultDto
   * @throws ApiError
   */
  public static updateEvent(
    eventId: number,
    requestBody: AdminUpdateEventDto
  ): CancelablePromise<AdminEventResultDto> {
    return __request(OpenAPI, {
      method: "PATCH",
      url: "/admin/events/posts/{eventId}",
      path: {
        eventId: eventId,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * 커리큘럼 게시글 삭제
   * @param eventId
   * @returns any
   * @throws ApiError
   */
  public static deleteEvent(eventId: number): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/admin/events/posts/{eventId}",
      path: {
        eventId: eventId,
      },
    });
  }
  /**
   * 커리큘럼 목록 조회
   * @param page
   * @param itemsPerPage
   * @returns PaginatedAdminEventCategoryListDto
   * @throws ApiError
   */
  public static getAllEventCategoriesWithPagination(
    page: number = 1,
    itemsPerPage: number = 10
  ): CancelablePromise<PaginatedAdminEventCategoryListDto> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/admin/events/categories",
      query: {
        page: page,
        itemsPerPage: itemsPerPage,
      },
    });
  }
  /**
   * 커리큘럼 등록
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static createEventCategory(
    requestBody: AdminCreateEventCategoryDto
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/admin/events/categories",
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * 커리큘럼 상세 조회
   * @param eventCategoriesId
   * @returns AdminEventCategoryDto
   * @throws ApiError
   */
  public static getEventCategoryById(
    eventCategoriesId: number
  ): CancelablePromise<AdminEventCategoryDto> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/admin/events/categories/{eventCategoriesId}",
      path: {
        eventCategoriesId: eventCategoriesId,
      },
    });
  }
  /**
   * 커리큘럼 삭제
   * @param eventCategoriesId
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static deleteEventCategory(
    eventCategoriesId: number,
    requestBody: AdminDeleteEventCategoryDto
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/admin/events/categories/{eventCategoriesId}",
      path: {
        eventCategoriesId: eventCategoriesId,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * 커리큘럼 게시글수 조회
   * @param eventCategoriesId
   * @returns number
   * @throws ApiError
   */
  public static getEventCategoryPostCount(
    eventCategoriesId: number
  ): CancelablePromise<number> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/admin/events/categories/{eventCategoriesId}/postcount",
      path: {
        eventCategoriesId: eventCategoriesId,
      },
    });
  }
}
