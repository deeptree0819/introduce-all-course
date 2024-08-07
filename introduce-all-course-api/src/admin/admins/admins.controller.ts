import { CustomApiOperation } from "@common/decorators/api-operation.decorator";
import { Roles } from "@common/decorators/roles.decorator";
import { IPaginated } from "@common/pagination";
import { Controller, Get, Query } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
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
  @Get("/admin/admins")
  async getAllAdmins(
    @Query() dto: GetAllAdminsWithPaginationDto,
  ): Promise<IPaginated<AdminSummaryDto>> {
    return this.adminsService.getAllAdmins(dto);
  }
}
