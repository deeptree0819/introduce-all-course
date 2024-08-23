/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateEventCategoryDto } from "../models/CreateEventCategoryDto";
import type { CreateEventDto } from "../models/CreateEventDto";
import type { DeleteEventCategoryDto } from "../models/DeleteEventCategoryDto";
import type { EventCategoryDto } from "../models/EventCategoryDto";
import type { EventResultDto } from "../models/EventResultDto";
import type { EventsOrderBy } from "../models/EventsOrderBy";
import type { Order } from "../models/Order";
import type { PaginatedEventCategoryListDto } from "../models/PaginatedEventCategoryListDto";
import type { PaginatedEventListDto } from "../models/PaginatedEventListDto";
import type { UpdateEventDto } from "../models/UpdateEventDto";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class EventsService {
  /**
   * 공고소개 게시글 목록 조회
   * @param order
   * @param orderBy
   * @param queryText
   * @param eventCategoryId
   * @param page
   * @param itemsPerPage
   * @returns PaginatedEventListDto
   * @throws ApiError
   */
  public static getAllEventsWithPagination(
    order?: Order,
    orderBy?: EventsOrderBy,
    queryText?: string,
    eventCategoryId?: string,
    page: number = 1,
    itemsPerPage: number = 30
  ): CancelablePromise<PaginatedEventListDto> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/events/posts",
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
   * 공고소개 게시글 작성
   * @param requestBody
   * @returns EventResultDto
   * @throws ApiError
   */
  public static createEvent(
    requestBody: CreateEventDto
  ): CancelablePromise<EventResultDto> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/events/posts",
      body: requestBody,
      mediaType: "application/json",
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
   * 공고소개 게시글 수정
   * @param eventId
   * @param requestBody
   * @returns EventResultDto
   * @throws ApiError
   */
  public static updateEvent(
    eventId: number,
    requestBody: UpdateEventDto
  ): CancelablePromise<EventResultDto> {
    return __request(OpenAPI, {
      method: "PATCH",
      url: "/events/posts/{eventId}",
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
    itemsPerPage: number = 30
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
      url: "/events/categories",
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
      url: "/events/categories/{eventCategoriesId}",
      path: {
        eventCategoriesId: eventCategoriesId,
      },
    });
  }
  /**
   * 공고분야 삭제
   * @param eventCategoriesId
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static deleteEventCategory(
    eventCategoriesId: number,
    requestBody: DeleteEventCategoryDto
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/events/categories/{eventCategoriesId}",
      path: {
        eventCategoriesId: eventCategoriesId,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * 공고분야 게시글수 조회
   * @param eventCategoriesId
   * @returns number
   * @throws ApiError
   */
  public static getEventCategoryPostCount(
    eventCategoriesId: number
  ): CancelablePromise<number> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/events/categories/{eventCategoriesId}/postcount",
      path: {
        eventCategoriesId: eventCategoriesId,
      },
    });
  }
}
