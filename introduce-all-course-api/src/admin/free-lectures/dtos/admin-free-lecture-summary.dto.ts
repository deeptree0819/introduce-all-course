import { Tables } from "@common/database.types";

export class AdminFreeLectureSummaryDto
  implements
    Pick<
      Tables<"free_lecture">,
      | "free_lecture_id"
      | "free_lecture_title"
      | "free_lecture_url"
      | "free_lecture_view_count"
      | "created_at"
    >
{
  free_lecture_id: number;
  free_lecture_title: string;
  free_lecture_url: string;
  free_lecture_view_count: number;
  created_at: string;
  created_by: { admin_name: string };
}
