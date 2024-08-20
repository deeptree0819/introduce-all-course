import { Tables } from "@common/database.types";

export class EventResultDto implements Tables<"events"> {
  events_id: number;
  created_at: string;
  created_by: number;
  updated_at: string;
  updated_by: number;
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
  event_attachment_urls: string[];
}
