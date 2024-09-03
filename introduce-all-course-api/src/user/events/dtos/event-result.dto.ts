import { Tables } from "@common/database.types";

export class EventResultDto
  implements
    Pick<
      Tables<"events">,
      | "event_organization"
      | "event_title"
      | "event_start_at"
      | "event_end_at"
      | "event_poster_image_url"
      | "event_thumbnail_url"
      | "event_info"
      | "event_description"
      | "event_view_count"
    >
{
  event_organization: string;
  event_title: string;
  event_start_at: string;
  event_end_at: string;
  event_poster_image_url: string;
  event_thumbnail_url: string;
  event_info: string;
  event_description: string;
  event_view_count: number;
  event_attachment_urls: string[];
  event_category_id: number;
  event_category_name: string;
}
