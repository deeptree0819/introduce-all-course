import { CustomApiOperation } from "@common/decorators/api-operation.decorator";
import { Roles } from "@common/decorators/roles.decorator";
import { BasePaginatedDto, IPaginated } from "@common/pagination";
import { Controller, Get, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse } from "@nestjs/swagger";
import { AdminsService } from "./admins.service";
import { AdminSummaryDto } from "./dtos/admin-summary.dto";
import { GetAllAdminsWithPaginationDto } from "./dtos/get-all-admins.dto";

@ApiBearerAuth()
@Roles("SUPER")
@Controller()
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @CustomApiOperation({
    summary: "어드민 목록 조회",
    tags: ["admin-admins"],
  })
  @ApiOkResponse({ type: BasePaginatedDto(AdminSummaryDto, "Admin") })
  @Get("/admin/admins")
  async getAllAdminsWithPagination(
    @Query() dto: GetAllAdminsWithPaginationDto,
  ): Promise<IPaginated<AdminSummaryDto>> {
    return this.adminsService.getAllAdminsWithPagination(dto);
  }
}
