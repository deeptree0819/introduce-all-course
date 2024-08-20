/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class DefaultService {
  /**
   * @returns string
   * @throws ApiError
   */
  public static appControllerGetHello(): CancelablePromise<string> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/say-hello",
    });
  }
  /**
   * @param tag
   * @param contentType
   * @param fileName
   * @returns string
   * @throws ApiError
   */
  public static getUploadUrl(
    tag: string,
    contentType: string,
    fileName: string
  ): CancelablePromise<string> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/upload",
      query: {
        tag: tag,
        contentType: contentType,
        fileName: fileName,
      },
    });
  }
}
