import { Tables } from "@common/database.types";

export class FreeLectureSummaryDto
  implements
    Pick<
      Tables<"free_lecture">,
      | "free_lecture_id"
      | "free_lecture_title"
      | "free_lecture_channel_name"
      | "free_lecture_thumbnail_url"
      | "free_lecture_view_count"
    >
{
  free_lecture_id: number;
  free_lecture_title: string;
  free_lecture_channel_name: string;
  free_lecture_thumbnail_url: string;
  free_lecture_view_count: number;
  free_lecture_tags: FreeLectureTagsDto[];
}

export class FreeLectureTagsDto {
  free_lecture_tag_name: string;
}
