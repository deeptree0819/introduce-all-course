/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FreeLectureTagsDto } from "./FreeLectureTagsDto";
export type FreeLectureSummaryDto = {
  free_lecture_id: number;
  free_lecture_title: string;
  free_lecture_channel_name: string;
  free_lecture_thumbnail_url: string;
  free_lecture_view_count: number;
  free_lecture_tags: Array<FreeLectureTagsDto>;
};
