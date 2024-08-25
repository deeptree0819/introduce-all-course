/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AdminEventResultDto = {
  events_id: number;
  created_at: string;
  updated_at: string;
  created_by: {
    admin_name?: string;
  };
  updated_by: {
    admin_name?: string;
  };
  event_thumbnail_url: string;
  event_organization: string;
  event_category_id: number;
  event_title: string;
  event_start_at: string;
  event_end_at: string;
  event_poster_image_url: string;
  event_info: string;
  event_description: string;
  event_view_count: number;
  event_attachment_urls: Array<string>;
};
