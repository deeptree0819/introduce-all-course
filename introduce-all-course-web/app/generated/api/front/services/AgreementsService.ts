/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AgreementDto } from "../models/AgreementDto";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class AgreementsService {
  /**
   * 약관 목록 조회
   * @returns AgreementDto
   * @throws ApiError
   */
  public static findAll(): CancelablePromise<Array<AgreementDto>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/agreements",
    });
  }
}
