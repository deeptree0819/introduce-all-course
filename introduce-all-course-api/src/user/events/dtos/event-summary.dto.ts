import { Tables } from "@common/database.types";

export class EventSummaryDto
  implements
    Pick<
      Tables<"events">,
      | "events_id"
      | "event_title"
      | "event_organization"
      | "event_end_at"
      | "event_thumbnail_url"
    >
{
  events_id: number;
  event_title: string;
  event_organization: string;
  event_end_at: string;
  event_thumbnail_url: string;
}
