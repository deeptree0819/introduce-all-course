import { Tables } from "@common/database.types";
import { CustomApiOperation } from "@common/decorators/api-operation.decorator";
import { CurrentUser } from "@common/decorators/current-user.decorator";
import { Roles } from "@common/decorators/roles.decorator";
import { BasePaginatedDto, IPaginated } from "@common/pagination";
import { Controller, Get, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { AdminsService } from "./admins.service";
import { AdminMeDto } from "./dtos/admin-me.dto";
import { AdminSummaryDto } from "./dtos/admin-summary.dto";
import { GetAllAdminsWithPaginationDto } from "./dtos/get-all-admins.dto";

@ApiBearerAuth()
@Roles("SUPER")
@Controller()
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @CustomApiOperation({
    summary: "내 정보 조회",
    tags: ["admins"],
  })
  @ApiBearerAuth()
  @Get("/admins/me")
  async findMe(@CurrentUser() me: Tables<"admins">): Promise<AdminMeDto> {
    return plainToInstance(AdminMeDto, me);
  }

  @CustomApiOperation({
    summary: "어드민 목록 조회",
    tags: ["admin-admins"],
  })
  @ApiOkResponse({ type: BasePaginatedDto(AdminSummaryDto, "Admin") })
  @Get("/admin/admins")
  async getAllAdmins(
    @Query() dto: GetAllAdminsWithPaginationDto,
  ): Promise<IPaginated<AdminSummaryDto>> {
    return this.adminsService.getAllAdmins(dto);
  }
}
