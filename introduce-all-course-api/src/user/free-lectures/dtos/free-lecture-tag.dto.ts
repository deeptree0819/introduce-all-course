import { Tables } from "@common/database.types";

export class FreeLectureTagDto implements Tables<"free_lecture_tags"> {
  free_lecture_tags_id: number;
  free_lecture_tag_name: string;
  created_at: string;
  updated_at: string;
}
