import { IsString } from "class-validator";

export class CreateEventCategoryDto {
  @IsString()
  event_category_name: string;
}
