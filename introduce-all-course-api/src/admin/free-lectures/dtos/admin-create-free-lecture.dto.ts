import { Tables } from "@common/database.types";

export class AdminCreateFreeLectureDto
  implements
    Pick<
      Tables<"free_lecture">,
      | "free_lecture_title"
      | "free_lecture_channel_name"
      | "free_lecture_url"
      | "free_lecture_thumbnail_url"
      | "free_lecture_description"
    >
{
  free_lecture_title: string;
  free_lecture_channel_name: string;
  free_lecture_url: string;
  free_lecture_tags: number[];
  free_lecture_thumbnail_url: string;
  free_lecture_description: string;
}
