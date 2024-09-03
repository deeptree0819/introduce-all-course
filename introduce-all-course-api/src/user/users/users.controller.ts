import { Tables } from "@common/database.types";
import { CustomApiOperation } from "@common/decorators/api-operation.decorator";
import { RolesGuard } from "@common/guards/roles.guard";
import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Patch,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@user/auth/auth.guard";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { UsersService } from "./users.service";

@UseGuards(AuthGuard, RolesGuard)
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @CustomApiOperation({
    summary: "유저 정보 수정",
    tags: ["users"],
  })
  @Patch("/user/:userId")
  async updateUser(
    @Param("userId", ParseIntPipe) userId: number,
    @Body() dto: UpdateUserDto,
  ): Promise<Tables<"users">> {
    return this.usersService.updateUser(userId, dto);
  }
}
