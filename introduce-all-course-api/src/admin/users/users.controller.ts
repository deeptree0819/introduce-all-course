import { Tables } from "@common/database.types";
import { CustomApiOperation } from "@common/decorators/api-operation.decorator";
import { BasePaginatedDto, IPaginated } from "@common/pagination";
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse } from "@nestjs/swagger";
import { GetAllUsersWithPaginationDto } from "./dtos/get-all-users.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { UserSummaryDto } from "./dtos/user-summary.dto";
import { UserDto } from "./dtos/user.dto";
import { UsersService } from "./users.service";

@ApiBearerAuth()
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @CustomApiOperation({
    summary: "유저 목록 조회",
    tags: ["admin-users"],
  })
  @ApiOkResponse({ type: BasePaginatedDto(UserSummaryDto, "User") })
  @Get("/admin/users")
  async getAllUsersWithPagination(
    @Query() dto: GetAllUsersWithPaginationDto,
  ): Promise<IPaginated<UserSummaryDto>> {
    return this.usersService.getAllUsersWithPagination(dto);
  }

  @CustomApiOperation({
    summary: "유저 상세 조회",
    tags: ["admin-users"],
  })
  @Get("/admin/users/:userId")
  async getUserById(
    @Param("userId", ParseIntPipe) userId: number,
  ): Promise<UserDto> {
    return this.usersService.getUserById(userId);
  }

  @CustomApiOperation({
    summary: "유저 정보 수정",
    tags: ["admin-users"],
  })
  @Patch("/admin/users/:userId")
  async updateUser(
    @Param("userId", ParseIntPipe) userId: number,
    @Body() dto: UpdateUserDto,
  ): Promise<Tables<"users">> {
    const updatedUser = await this.usersService.updateUser(userId, dto);
    return updatedUser;
  }
}
