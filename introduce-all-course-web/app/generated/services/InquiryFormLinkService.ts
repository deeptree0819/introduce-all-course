/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class InquiryFormLinkService {
  /**
   * 상담신청 링크 조회
   * @returns string
   * @throws ApiError
   */
  public static getLatestInquiryFormLink(): CancelablePromise<string> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/inquiry/form-links/latest",
    });
  }
}
