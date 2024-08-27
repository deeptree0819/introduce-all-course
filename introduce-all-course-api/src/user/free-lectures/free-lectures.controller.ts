import { CustomApiOperation } from "@common/decorators/api-operation.decorator";
import { BasePaginatedDto, IPaginated, PaginateDto } from "@common/pagination";
import { Controller, Get, Param, ParseIntPipe, Query } from "@nestjs/common";
import { ApiOkResponse } from "@nestjs/swagger";
import { FreeLectureResultDto } from "./dtos/free-lecture-result.dto";
import { FreeLectureSummaryDto } from "./dtos/free-lecture-summary.dto";
import { FreeLectureTagDto } from "./dtos/free-lecture-tag.dto";
import { GetAllFreeLecturesWithPaginationDto } from "./dtos/get-all-free-lectures.dto";
import { FreeLecturesService } from "./free-lectures.service";

@Controller()
export class FreeLecturesController {
  constructor(private readonly freeLecturesService: FreeLecturesService) {}

  @CustomApiOperation({
    summary: "무료강의 게시글 목록 조회",
    tags: ["free-lectures"],
  })
  @ApiOkResponse({
    type: BasePaginatedDto(FreeLectureSummaryDto, "FreeLectureSummary"),
  })
  @Get("/free-lecture/posts")
  async getAllFreeLecturesWithPagination(
    @Query() dto: GetAllFreeLecturesWithPaginationDto,
  ): Promise<IPaginated<FreeLectureSummaryDto>> {
    return this.freeLecturesService.getAllFreeLecturesWithPagination(dto);
  }

  @CustomApiOperation({
    summary: "무료강의 게시글 상세 조회",
    tags: ["free-lectures"],
  })
  @Get("/free-lecture/posts/:postId")
  async getFreeLectureById(
    @Param("postId", ParseIntPipe) postId: number,
  ): Promise<FreeLectureResultDto> {
    return this.freeLecturesService.getFreeLectureById(postId);
  }

  @CustomApiOperation({
    summary: "무료강의 태그 목록 조회",
    tags: ["free-lectures"],
  })
  @ApiOkResponse({
    type: BasePaginatedDto(FreeLectureTagDto, "FreeLectureTag"),
  })
  @Get("/free-lecture/categories")
  async getAllFreeLectureTagsWithPagination(
    @Query() dto: PaginateDto,
  ): Promise<IPaginated<FreeLectureTagDto>> {
    return this.freeLecturesService.getAllFreeLectureTagsWithPagination(dto);
  }
}
