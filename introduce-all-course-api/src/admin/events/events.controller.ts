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
import { AdminCreateEventCategoryDto } from "./dtos/admin-create-event-category.dto";
import { AdminCreateEventDto } from "./dtos/admin-create-event.dto";
import { AdminDeleteEventCategoryDto } from "./dtos/admin-delete-event-category.dto";
import { AdminEventCategoryDto } from "./dtos/admin-event-category.dto";
import { AdminEventResultDto } from "./dtos/admin-event-result.dto";
import { AdminEventSummaryDto } from "./dtos/admin-event-summary.dto";
import { AdminGetAllEventsWithPaginationDto } from "./dtos/admin-get-all-events.dto";
import { AdminUpdateEventDto } from "./dtos/admin-update-event.dto";
import { EventsService } from "./events.service";

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@Controller()
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @CustomApiOperation({
    summary: "커리큘럼 게시글 목록 조회",
    tags: ["admin-events"],
  })
  @ApiOkResponse({
    type: BasePaginatedDto(AdminEventSummaryDto, "AdminEventSummary"),
  })
  @Get("/admin/events/posts")
  async getAllEventsWithPagination(
    @Query() dto: AdminGetAllEventsWithPaginationDto,
  ): Promise<IPaginated<AdminEventSummaryDto>> {
    return this.eventsService.getAllEventsWithPagination(dto);
  }

  @CustomApiOperation({
    summary: "커리큘럼 게시글 상세 조회",
    tags: ["admin-events"],
  })
  @Get("/admin/events/posts/:eventId")
  async getEventById(
    @Param("eventId", ParseIntPipe) eventId: number,
  ): Promise<AdminEventResultDto> {
    return this.eventsService.getEventById(eventId);
  }

  @CustomApiOperation({
    summary: "커리큘럼 게시글 수정",
    tags: ["admin-events"],
  })
  @Patch("/admin/events/posts/:eventId")
  async updateEvent(
    @CurrentUser() me,
    @Param("eventId", ParseIntPipe) eventId: number,
    @Body() dto: AdminUpdateEventDto,
  ): Promise<AdminEventResultDto> {
    return this.eventsService.updateEvent(me.userId, eventId, dto);
  }

  @CustomApiOperation({
    summary: "커리큘럼 게시글 작성",
    tags: ["admin-events"],
  })
  @Post("/admin/events/posts")
  async createEvent(
    @CurrentUser() me,
    @Body() dto: AdminCreateEventDto,
  ): Promise<AdminEventResultDto> {
    return this.eventsService.createEvent(me.userId, dto);
  }

  @CustomApiOperation({
    summary: "커리큘럼 게시글 삭제",
    tags: ["admin-events"],
  })
  @Delete("/admin/events/posts/:eventId")
  async deleteEvent(@Param("eventId", ParseIntPipe) eventId: number) {
    this.eventsService.deleteEvent(eventId);
  }

  @CustomApiOperation({
    summary: "커리큘럼 목록 조회",
    tags: ["admin-events"],
  })
  @ApiOkResponse({
    type: BasePaginatedDto(AdminEventCategoryDto, "AdminEventCategory"),
  })
  @Get("/admin/events/categories")
  async getAllEventCategoriesWithPagination(
    @Query() dto: PaginateDto,
  ): Promise<IPaginated<AdminEventCategoryDto>> {
    return this.eventsService.getAllEventCategoriesWithPagination(dto);
  }

  @CustomApiOperation({
    summary: "커리큘럼 상세 조회",
    tags: ["admin-events"],
  })
  @Get("/admin/events/categories/:eventCategoriesId")
  async getEventCategoryById(
    @Param("eventCategoriesId", ParseIntPipe) eventCategoriesId: number,
  ): Promise<AdminEventCategoryDto> {
    return this.eventsService.getEventCategoryById(eventCategoriesId);
  }

  @CustomApiOperation({
    summary: "커리큘럼 등록",
    tags: ["admin-events"],
  })
  @Post("/admin/events/categories")
  async createEventCategory(
    @Body() dto: AdminCreateEventCategoryDto,
  ): Promise<Tables<"event_categories">> {
    return this.eventsService.createEventCategory(dto);
  }

  @CustomApiOperation({
    summary: "커리큘럼 삭제",
    tags: ["admin-events"],
  })
  @Delete("/admin/events/categories/:eventCategoriesId")
  async deleteEventCategory(
    @Param("eventCategoriesId", ParseIntPipe) eventCategoriesId: number,
    @Body() dto: AdminDeleteEventCategoryDto,
  ) {
    this.eventsService.deleteEventCategory(eventCategoriesId, dto);
  }

  @CustomApiOperation({
    summary: "커리큘럼 게시글수 조회",
    tags: ["admin-events"],
  })
  @Get("/admin/events/categories/:eventCategoriesId/postcount")
  async getEventCategoryPostCount(
    @Param("eventCategoriesId", ParseIntPipe) eventCategoriesId: number,
  ) {
    return this.eventsService.getEventCategoryPostCount(eventCategoriesId);
  }
}
