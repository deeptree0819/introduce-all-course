/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FileCategory } from "./FileCategory";

export type CreatePresignedPostDto = {
  /**
   * 파일 카테고리
   */
  fileCategory: FileCategory;
  /**
   * 파일명
   */
  fileName: string;
  /**
   * Content-Type
   */
  contentType?: string;
};
