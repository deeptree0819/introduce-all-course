/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateEventCategoryDto } from "../models/CreateEventCategoryDto";
import type { CreateEventDto } from "../models/CreateEventDto";
import type { EventCategoryDto } from "../models/EventCategoryDto";
import type { EventDto } from "../models/EventDto";
import type { EventsOrderBy } from "../models/EventsOrderBy";
import type { Order } from "../models/Order";
import type { PaginatedEventCategoryListDto } from "../models/PaginatedEventCategoryListDto";
import type { PaginatedEventListDto } from "../models/PaginatedEventListDto";
import type { UpdateEventDto } from "../models/UpdateEventDto";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class AdminEventsService {
  /**
   * 공고소개 게시글 목록 조회
   * @param order
   * @param orderBy
   * @param queryText
   * @param page
   * @param itemsPerPage
   * @returns PaginatedEventListDto
   * @throws ApiError
   */
  public static getAllEventsWithPagination(
    order?: Order,
    orderBy?: EventsOrderBy,
    queryText?: string,
    page: number = 1,
    itemsPerPage: number = 30
  ): CancelablePromise<PaginatedEventListDto> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/admin/events/posts",
      query: {
        order: order,
        orderBy: orderBy,
        queryText: queryText,
        page: page,
        itemsPerPage: itemsPerPage,
      },
    });
  }
  /**
   * 공고소개 게시글 작성
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static createEvent(
    requestBody: CreateEventDto
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/admin/events/posts",
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * 공고소개 게시글 상세 조회
   * @param eventId
   * @returns EventDto
   * @throws ApiError
   */
  public static getEventById(eventId: number): CancelablePromise<EventDto> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/admin/events/posts/{eventId}",
      path: {
        eventId: eventId,
      },
    });
  }
  /**
   * 공고소개 게시글 수정
   * @param eventId
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static updateEvent(
    eventId: number,
    requestBody: UpdateEventDto
  ): CancelablePromise<any> {
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
   * 공고소개 게시글 삭제
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
   * 공고분야 목록 조회
   * @param page
   * @param itemsPerPage
   * @returns PaginatedEventCategoryListDto
   * @throws ApiError
   */
  public static getAllEventCategoriesWithPagination(
    page: number = 1,
    itemsPerPage: number = 30
  ): CancelablePromise<PaginatedEventCategoryListDto> {
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
   * 공고분야 등록
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static createEventCategory(
    requestBody: CreateEventCategoryDto
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/admin/events/categories",
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * 공고분야 상세 조회
   * @param eventCategoriesId
   * @returns EventCategoryDto
   * @throws ApiError
   */
  public static getEventCategoryById(
    eventCategoriesId: number
  ): CancelablePromise<EventCategoryDto> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/admin/events/categories/{eventCategoriesId}",
      path: {
        eventCategoriesId: eventCategoriesId,
      },
    });
  }
  /**
   * 공고분야 삭제
   * @param eventCategoriesId
   * @returns any
   * @throws ApiError
   */
  public static deleteEventCategory(
    eventCategoriesId: number
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/admin/events/categories/{eventCategoriesId}",
      path: {
        eventCategoriesId: eventCategoriesId,
      },
    });
  }
}
