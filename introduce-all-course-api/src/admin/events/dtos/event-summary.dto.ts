import { Tables } from "@common/database.types";

export class EventSummaryDto
  implements
    Omit<
      Tables<"events">,
      | "created_by"
      | "updated_at"
      | "updated_by"
      | "event_description"
      | "event_info"
      | "event_category_id"
      | "event_poster_image_url"
      | "event_thumbnail_url"
    >
{
  events_id: number;
  event_title: string;
  event_category_name: string;
  event_start_at: string;
  event_end_at: string;
  event_organization: string;
  event_view_count: number;
  created_at: string;
  created_by: string;
}
