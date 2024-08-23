import { Tables } from "@common/database.types";
import { CustomApiOperation } from "@common/decorators/api-operation.decorator";
import { Roles } from "@common/decorators/roles.decorator";
import { BasePaginatedDto, IPaginated } from "@common/pagination";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse } from "@nestjs/swagger";
import { AdminsService } from "./admins.service";
import { AdminSummaryDto } from "./dtos/admin-summary.dto";
import { AdminDto } from "./dtos/admin.dto";
import { CreateAdminDto } from "./dtos/create-admin.dto";
import { GetAllAdminsWithPaginationDto } from "./dtos/get-all-admins.dto";
import { UpdateAdminDto } from "./dtos/update-admin.dto";

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

  @CustomApiOperation({
    summary: "어드민 상세 조회",
    tags: ["admin-admins"],
  })
  @Get("/admin/admins/:adminId")
  async getAdminById(
    @Param("adminId", ParseIntPipe) adminId: number,
  ): Promise<AdminDto> {
    return this.adminsService.getAdminById(adminId);
  }

  @CustomApiOperation({
    summary: "어드민 정보 수정",
    tags: ["admin-admins"],
  })
  @Patch("/admin/admins/:adminId")
  async updateAdmin(
    @Param("adminId", ParseIntPipe) adminId: number,
    @Body() dto: UpdateAdminDto,
  ): Promise<Tables<"admins">> {
    return this.adminsService.updateAdmin(adminId, dto);
  }

  @CustomApiOperation({
    summary: "어드민 삭제",
    tags: ["admin-admins"],
  })
  @Delete("/admin/admins/:adminId")
  async deleteAdmin(
    @Param("adminId", ParseIntPipe) adminId: number,
  ): Promise<void> {
    return this.adminsService.deleteAdmin(adminId);
  }

  @CustomApiOperation({
    summary: "어드민 등록",
    tags: ["admin-admins"],
  })
  @Post("/admin/admins")
  async createAdmin(@Body() dto: CreateAdminDto): Promise<Tables<"admins">> {
    return this.adminsService.createAdmin(dto);
  }
}
