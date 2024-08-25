import { IsString } from "class-validator";

export class AdminCreateEventCategoryDto {
  @IsString()
  event_category_name: string;
}
