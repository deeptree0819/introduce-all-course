import { Tables } from "@common/database.types";

export class AdminEventCategoryDto implements Tables<"event_categories"> {
  event_categories_id: number;
  event_category_name: string;
  created_at: string;
  updated_at: string;
}
