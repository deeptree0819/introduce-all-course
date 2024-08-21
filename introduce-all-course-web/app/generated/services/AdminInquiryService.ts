/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateInquiryFormLinkDto } from "../models/CreateInquiryFormLinkDto";
import type { InquiryFormLinkDto } from "../models/InquiryFormLinkDto";
import type { PaginatedInquiryFormLinkListDto } from "../models/PaginatedInquiryFormLinkListDto";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class AdminInquiryService {
  /**
   * 상담신청 링크 목록 조회
   * @param page
   * @param itemsPerPage
   * @returns PaginatedInquiryFormLinkListDto
   * @throws ApiError
   */
  public static getAllInquiryFormLinksWithPagination(
    page: number = 1,
    itemsPerPage: number = 30
  ): CancelablePromise<PaginatedInquiryFormLinkListDto> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/admin/inquiry/form-links",
      query: {
        page: page,
        itemsPerPage: itemsPerPage,
      },
    });
  }
  /**
   * 상담신청 링크 추가
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static createInquiryFormLink(
    requestBody: CreateInquiryFormLinkDto
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/admin/inquiry/form-links",
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * 상담신청 링크 조회
   * @returns InquiryFormLinkDto
   * @throws ApiError
   */
  public static getLatestInquiryFormLink(): CancelablePromise<InquiryFormLinkDto> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/admin/inquiry/form-links/latest",
    });
  }
}
