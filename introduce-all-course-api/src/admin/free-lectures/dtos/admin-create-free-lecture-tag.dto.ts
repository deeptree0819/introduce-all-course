import { IsString } from "class-validator";

export class AdminCreateFreeLectureTagDto {
  @IsString()
  free_lecture_tag_name: string;
}
