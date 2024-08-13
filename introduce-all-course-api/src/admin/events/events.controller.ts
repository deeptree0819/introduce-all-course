import { Tables } from "@common/database.types";
import { CustomApiOperation } from "@common/decorators/api-operation.decorator";
import { CurrentUser } from "@common/decorators/current-user.decorator";
import { BasePaginatedDto, IPaginated } from "@common/pagination";
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse } from "@nestjs/swagger";
import { CreateEventDto } from "./dtos/create-event.dto";
import { EventSummaryDto } from "./dtos/event-summary.dto";
import { EventDto } from "./dtos/event.dto";
import { GetAllEventsWithPaginationDto } from "./dtos/get-all-events.dto";
import { UpdateEventDto } from "./dtos/update-event.dto";
import { EventsService } from "./events.service";

@ApiBearerAuth()
@Controller()
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @CustomApiOperation({
    summary: "공고소개 게시글 목록 조회",
    tags: ["admin-events"],
  })
  @ApiOkResponse({ type: BasePaginatedDto(EventSummaryDto, "event") })
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
  ): Promise<EventDto> {
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
  ): Promise<Tables<"events">> {
    return this.eventsService.updateEvent(me.userId, eventId, dto);
  }

  @CustomApiOperation({
    summary: "공고소개 게시글 작성",
    tags: ["admin-events"],
  })
  @Post("/admin/events/posts/:eventId")
  async createEvent(
    @CurrentUser() me,
    @Body() dto: CreateEventDto,
  ): Promise<Tables<"events">> {
    return this.eventsService.createEvent(me.userId, dto);
  }
}
