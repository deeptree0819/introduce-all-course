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
import { CreateEventCategoryDto } from "./dtos/create-event-category.dto";
import { CreateEventDto } from "./dtos/create-event.dto";
import { DeleteEventCategoryDto } from "./dtos/delete-event-category.dto";
import { EventCategoryDto } from "./dtos/event-category.dto";
import { EventResultDto } from "./dtos/event-result.dto";
import { EventSummaryDto } from "./dtos/event-summary.dto";
import { GetAllEventsWithPaginationDto } from "./dtos/get-all-events.dto";
import { UpdateEventDto } from "./dtos/update-event.dto";
import { EventsService } from "./events.service";

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@Controller()
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @CustomApiOperation({
    summary: "공고소개 게시글 목록 조회",
    tags: ["admin-events"],
  })
  @ApiOkResponse({ type: BasePaginatedDto(EventSummaryDto, "Event") })
  @Get("/admin/events/posts")
  async getAllEventsWithPagination(
    @Query() dto: GetAllEventsWithPaginationDto,
  ): Promise<IPaginated<EventSummaryDto>> {
    return this.eventsService.getAllEventsWithPagination(dto);
  }

  @CustomApiOperation({
    summary: "공고소개 게시글 상세 조회",
    tags: ["admin-events"],
  })
  @Get("/admin/events/posts/:eventId")
  async getEventById(
    @Param("eventId", ParseIntPipe) eventId: number,
  ): Promise<EventResultDto> {
    return this.eventsService.getEventById(eventId);
  }

  @CustomApiOperation({
    summary: "공고소개 게시글 수정",
    tags: ["admin-events"],
  })
  @Patch("/admin/events/posts/:eventId")
  async updateEvent(
    @CurrentUser() me,
    @Param("eventId", ParseIntPipe) eventId: number,
    @Body() dto: UpdateEventDto,
  ): Promise<EventResultDto> {
    return this.eventsService.updateEvent(me.userId, eventId, dto);
  }

  @CustomApiOperation({
    summary: "공고소개 게시글 작성",
    tags: ["admin-events"],
  })
  @Post("/admin/events/posts")
  async createEvent(
    @CurrentUser() me,
    @Body() dto: CreateEventDto,
  ): Promise<EventResultDto> {
    return this.eventsService.createEvent(me.userId, dto);
  }

  @CustomApiOperation({
    summary: "공고소개 게시글 삭제",
    tags: ["admin-events"],
  })
  @Delete("/admin/events/posts/:eventId")
  async deleteEvent(@Param("eventId", ParseIntPipe) eventId: number) {
    this.eventsService.deleteEvent(eventId);
  }

  @CustomApiOperation({
    summary: "공고분야 목록 조회",
    tags: ["admin-events"],
  })
  @ApiOkResponse({ type: BasePaginatedDto(EventCategoryDto, "EventCategory") })
  @Get("/admin/events/categories")
  async getAllEventCategoriesWithPagination(
    @Query() dto: PaginateDto,
  ): Promise<IPaginated<EventCategoryDto>> {
    return this.eventsService.getAllEventCategoriesWithPagination(dto);
  }

  @CustomApiOperation({
    summary: "공고분야 상세 조회",
    tags: ["admin-events"],
  })
  @Get("/admin/events/categories/:eventCategoriesId")
  async getEventCategoryById(
    @Param("eventCategoriesId", ParseIntPipe) eventCategoriesId: number,
  ): Promise<EventCategoryDto> {
    return this.eventsService.getEventCategoryById(eventCategoriesId);
  }

  @CustomApiOperation({
    summary: "공고분야 등록",
    tags: ["admin-events"],
  })
  @Post("/admin/events/categories")
  async createEventCategory(
    @Body() dto: CreateEventCategoryDto,
  ): Promise<Tables<"event_categories">> {
    return this.eventsService.createEventCategory(dto);
  }

  @CustomApiOperation({
    summary: "공고분야 삭제",
    tags: ["admin-events"],
  })
  @Delete("/admin/events/categories/:eventCategoriesId")
  async deleteEventCategory(
    @Param("eventCategoriesId", ParseIntPipe) eventCategoriesId: number,
    @Body() dto: DeleteEventCategoryDto,
  ) {
    this.eventsService.deleteEventCategory(eventCategoriesId, dto);
  }

  @CustomApiOperation({
    summary: "공고분야 게시글수 조회",
    tags: ["admin-events"],
  })
  @Get("/admin/events/categories/:eventCategoriesId/postcount")
  async getEventCategoryPostCount(
    @Param("eventCategoriesId", ParseIntPipe) eventCategoriesId: number,
  ) {
    return this.eventsService.getEventCategoryPostCount(eventCategoriesId);
  }
}
