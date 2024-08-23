import { Tables } from "@common/database.types";

export class UpdateEventDto
  implements
    Partial<
      Omit<Tables<"events">, "created_by" | "updated_by" | "event_view_count">
    >
{
  event_thumbnail_url?: string;
  event_organization?: string;
  event_category_id?: number;
  event_title?: string;
  event_start_at?: string;
  event_end_at?: string;
  event_poster_image_url?: string;
  event_info?: string;
  event_description?: string;
  events_id?: number;
  event_attachment_urls: string[];
}
