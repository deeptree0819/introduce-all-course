import { IsNumber } from "class-validator";

export class AdminDeleteEventCategoryDto {
  @IsNumber()
  move_category_id: number;
}
