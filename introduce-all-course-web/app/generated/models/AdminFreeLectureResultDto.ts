/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FreeLectureTags } from "./FreeLectureTags";
export type AdminFreeLectureResultDto = {
  free_lecture_id: number;
  created_at: string;
  updated_at: string;
  created_by: {
    admin_name?: string;
  };
  updated_by: {
    admin_name?: string;
  };
  free_lecture_description: string;
  free_lecture_thumbnail_url: string;
  free_lecture_title: string;
  free_lecture_channel_name: string;
  free_lecture_url: string;
  free_lecture_view_count: number;
  free_lecture_tags: Array<FreeLectureTags>;
};
