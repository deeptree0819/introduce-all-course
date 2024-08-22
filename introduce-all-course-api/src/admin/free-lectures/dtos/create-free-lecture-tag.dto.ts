import { IsString } from "class-validator";

export class CreateFreeLectureTagDto {
  @IsString()
  free_lecture_tag_name: string;
}
