import { IsNumber } from "class-validator";

export class DeleteEventCategoryDto {
  @IsNumber()
  move_category_id: number;
}
