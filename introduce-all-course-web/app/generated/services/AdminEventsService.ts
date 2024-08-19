/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateEventDto } from "../models/CreateEventDto";
import type { EventDto } from "../models/EventDto";
import type { PaginatedeventListDto } from "../models/PaginatedeventListDto";
import type { UpdateEventDto } from "../models/UpdateEventDto";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class AdminEventsService {
  /**
   * 공고소개 게시글 목록 조회
   * @param order
   * @param queryText
   * @param page
   * @param itemsPerPage
   * @returns PaginatedeventListDto
   * @throws ApiError
   */
  public static getAllEventsWithPagination(
    order?: "ASC" | "DESC",
    queryText?: string,
    page: number = 1,
    itemsPerPage: number = 30
  ): CancelablePromise<PaginatedeventListDto> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/admin/events/posts",
      query: {
        order: order,
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
}
