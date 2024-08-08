import { CustomApiOperation } from "@common/decorators/api-operation.decorator";
import { BasePaginatedDto, IPaginated } from "@common/pagination";
import { Controller, Get, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse } from "@nestjs/swagger";
import { GetAllUsersWithPaginationDto } from "./dtos/get-all-users.dto";
import { UserSummaryDto } from "./dtos/user-summary.dto";
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
}
