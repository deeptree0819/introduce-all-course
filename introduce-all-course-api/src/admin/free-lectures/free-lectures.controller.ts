import { JwtAuthGuard } from "@admin/auth/jwt-auth.guard";
import { Tables } from "@common/database.types";
import { CustomApiOperation } from "@common/decorators/api-operation.decorator";
import { CurrentUser } from "@common/decorators/current-user.decorator";
import { RolesGuard } from "@common/guards/roles.guard";
import { BasePaginatedDto, IPaginated, PaginateDto } from "@common/pagination";
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
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse } from "@nestjs/swagger";
import { AdminCreateFreeLectureTagDto } from "./dtos/admin-create-free-lecture-tag.dto";
import { AdminCreateFreeLectureDto } from "./dtos/admin-create-free-lecture.dto";
import { AdminFreeLectureResultDto } from "./dtos/admin-free-lecture-result.dto";
import { AdminFreeLectureSummaryDto } from "./dtos/admin-free-lecture-summary.dto";
import { AdminFreeLectureTagDto } from "./dtos/admin-free-lecture-tag.dto";
import { AdminFreeLectureDto } from "./dtos/admin-free-lecture.dto";
import { AdminGetAllFreeLecturesWithPaginationDto } from "./dtos/admin-get-all-free-lectures.dto";
import { AdminUpdateFreeLectureDto } from "./dtos/admin-update-free-lecture.dto";
import { FreeLecturesService } from "./free-lectures.service";

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@Controller()
export class FreeLecturesController {
  constructor(private readonly freeLecturesService: FreeLecturesService) {}

  @CustomApiOperation({
    summary: "무료강의 게시글 목록 조회",
    tags: ["admin-free-lectures"],
  })
  @ApiOkResponse({
    type: BasePaginatedDto(
      AdminFreeLectureSummaryDto,
      "AdminFreeLectureSummary",
    ),
  })
  @Get("/admin/free-lecture/posts")
  async getAllFreeLecturesWithPagination(
    @Query() dto: AdminGetAllFreeLecturesWithPaginationDto,
  ): Promise<IPaginated<AdminFreeLectureSummaryDto>> {
    return this.freeLecturesService.getAllFreeLecturesWithPagination(dto);
  }

  @CustomApiOperation({
    summary: "무료강의 게시글 상세 조회",
    tags: ["admin-free-lectures"],
  })
  @Get("/admin/free-lecture/posts/:postId")
  async getFreeLectureById(
    @Param("postId", ParseIntPipe) postId: number,
  ): Promise<AdminFreeLectureResultDto> {
    return this.freeLecturesService.getFreeLectureById(postId);
  }

  @CustomApiOperation({
    summary: "무료강의 게시글 수정",
    tags: ["admin-free-lectures"],
  })
  @Patch("/admin/free-lecture/posts/:postId")
  async updateFreeLecture(
    @CurrentUser() me,
    @Param("postId", ParseIntPipe) postId: number,
    @Body() dto: AdminUpdateFreeLectureDto,
  ): Promise<AdminFreeLectureResultDto> {
    return this.freeLecturesService.updateFreeLecture(me.userId, postId, dto);
  }

  @CustomApiOperation({
    summary: "무료강의 게시글 작성",
    tags: ["admin-free-lectures"],
  })
  @Post("/admin/free-lecture/posts")
  async createFreeLecture(
    @CurrentUser() me,
    @Body() dto: AdminCreateFreeLectureDto,
  ): Promise<AdminFreeLectureDto> {
    return this.freeLecturesService.createFreeLecture(me.userId, dto);
  }

  @CustomApiOperation({
    summary: "무료강의 게시글 삭제",
    tags: ["admin-free-lectures"],
  })
  @Delete("/admin/free-lecture/posts/:postId")
  async deleteFreeLecture(@Param("postId", ParseIntPipe) postId: number) {
    this.freeLecturesService.deleteFreeLecture(postId);
  }

  @CustomApiOperation({
    summary: "무료강의 태그 목록 조회",
    tags: ["admin-free-lectures"],
  })
  @ApiOkResponse({
    type: BasePaginatedDto(AdminFreeLectureTagDto, "AdminFreeLectureTag"),
  })
  @Get("/admin/free-lecture/categories")
  async getAllFreeLectureTagsWithPagination(
    @Query() dto: PaginateDto,
  ): Promise<IPaginated<AdminFreeLectureTagDto>> {
    return this.freeLecturesService.getAllFreeLectureTagsWithPagination(dto);
  }

  @CustomApiOperation({
    summary: "무료강의 태그 상세 조회",
    tags: ["admin-free-lectures"],
  })
  @Get("/admin/free-lecture/categories/:FreeLectureTagId")
  async getFreeLectureTagById(
    @Param("FreeLectureTagId", ParseIntPipe)
    FreeLectureTagId: number,
  ): Promise<AdminFreeLectureTagDto> {
    return this.freeLecturesService.getFreeLectureTagById(FreeLectureTagId);
  }

  @CustomApiOperation({
    summary: "무료강의 태그 등록",
    tags: ["admin-free-lectures"],
  })
  @Post("/admin/free-lecture/categories")
  async createFreeLectureTag(
    @Body() dto: AdminCreateFreeLectureTagDto,
  ): Promise<Tables<"free_lecture_tags">> {
    return this.freeLecturesService.createFreeLectureTag(dto);
  }

  @CustomApiOperation({
    summary: "무료강의 태그 삭제",
    tags: ["admin-free-lectures"],
  })
  @Delete("/admin/free-lecture/categories/:FreeLectureTagId")
  async deleteFreeLectureTag(
    @Param("FreeLectureTagId", ParseIntPipe)
    FreeLectureTagId: number,
  ) {
    this.freeLecturesService.deleteFreeLectureTag(FreeLectureTagId);
  }

  @CustomApiOperation({
    summary: "무료강의 태그 게시글수 조회",
    tags: ["admin-free-lectures"],
  })
  @Get("/admin/free-lecture/categories/:FreeLectureTagId/postcount")
  async getFreeLectureTagPostCount(
    @Param("FreeLectureTagId", ParseIntPipe)
    FreeLectureTagId: number,
  ) {
    return this.freeLecturesService.getFreeLectureTagPostCount(
      FreeLectureTagId,
    );
  }
}
