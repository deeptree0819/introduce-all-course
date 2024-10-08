import { Tables } from "@common/database.types";

export class UpdateLectureViewCountDto
  implements Omit<Tables<"free_lecture">, "created_by">
{
  free_lecture_id: number;
  created_at: string;
  updated_at: string;
  created_by: { admin_name: string; admin_id: number };
  updated_by: number;
  free_lecture_description: string;
  free_lecture_thumbnail_url: string;
  free_lecture_title: string;
  free_lecture_channel_name: string;
  free_lecture_url: string;
  free_lecture_view_count: number;
}
