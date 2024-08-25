/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EventResultDto } from "../models/EventResultDto";
import type { EventsOrderBy } from "../models/EventsOrderBy";
import type { Order } from "../models/Order";
import type { PaginatedEventCategoryListDto } from "../models/PaginatedEventCategoryListDto";
import type { PaginatedEventListDto } from "../models/PaginatedEventListDto";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class EventsService {
  /**
   * 공고소개 게시글 목록 조회
   * @param order
   * @param orderBy
   * @param eventCategoryId
   * @param excludeEventId
   * @param page
   * @param itemsPerPage
   * @returns PaginatedEventListDto
   * @throws ApiError
   */
  public static getAllEventsWithPagination(
    order?: Order,
    orderBy?: EventsOrderBy,
    eventCategoryId?: Array<number>,
    excludeEventId?: number,
    page: number = 1,
    itemsPerPage: number = 10
  ): CancelablePromise<PaginatedEventListDto> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/events/posts",
      query: {
        order: order,
        orderBy: orderBy,
        eventCategoryId: eventCategoryId,
        excludeEventId: excludeEventId,
        page: page,
        itemsPerPage: itemsPerPage,
      },
    });
  }
  /**
   * 공고소개 게시글 상세 조회
   * @param eventId
   * @returns EventResultDto
   * @throws ApiError
   */
  public static getEventById(
    eventId: number
  ): CancelablePromise<EventResultDto> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/events/posts/{eventId}",
      path: {
        eventId: eventId,
      },
    });
  }
  /**
   * 공고분야 목록 조회
   * @param page
   * @param itemsPerPage
   * @returns PaginatedEventCategoryListDto
   * @throws ApiError
   */
  public static getAllEventCategoriesWithPagination(
    page: number = 1,
    itemsPerPage: number = 10
  ): CancelablePromise<PaginatedEventCategoryListDto> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/events/categories",
      query: {
        page: page,
        itemsPerPage: itemsPerPage,
      },
    });
  }
}
