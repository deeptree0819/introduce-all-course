import { Tables } from "@common/database.types";

export class FreeLectureDto
  implements Omit<Tables<"free_lecture">, "created_by" | "updated_by">
{
  free_lecture_id: number;
  created_at: string;
  updated_at: string;
  created_by: { admin_name: string };
  updated_by: { admin_name: string };
  free_lecture_description: string;
  free_lecture_thumbnail_url: string;
  free_lecture_title: string;
  free_lecture_url: string;
  free_lecture_view_count: number;
}
