import { Tables } from "@common/database.types";

export class EventSummaryDto
  implements
    Pick<
      Tables<"events">,
      | "events_id"
      | "event_title"
      | "event_organization"
      | "event_start_at"
      | "event_end_at"
      | "event_thumbnail_url"
    >
{
  events_id: number;
  event_title: string;
  event_organization: string;
  event_start_at: string;
  event_end_at: string;
  event_thumbnail_url: string;
}
