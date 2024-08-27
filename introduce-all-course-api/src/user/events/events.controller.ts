import { CustomApiOperation } from "@common/decorators/api-operation.decorator";
import { BasePaginatedDto, IPaginated, PaginateDto } from "@common/pagination";
import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from "@nestjs/common";
import { ApiOkResponse } from "@nestjs/swagger";
import { EventCategoryDto } from "./dtos/event-category.dto";
import { EventResultDto } from "./dtos/event-result.dto";
import { EventSummaryDto } from "./dtos/event-summary.dto";
import { GetAllEventsWithPaginationDto } from "./dtos/get-all-events.dto";
import { EventsService } from "./events.service";

@Controller()
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @CustomApiOperation({
    summary: "공고소개 게시글 목록 조회",
    tags: ["events"],
  })
  @ApiOkResponse({ type: BasePaginatedDto(EventSummaryDto, "Event") })
  @Get("/events/posts")
  async getAllEventsWithPagination(
    @Query() dto: GetAllEventsWithPaginationDto,
  ): Promise<IPaginated<EventSummaryDto>> {
    return this.eventsService.getAllEventsWithPagination(dto);
  }

  @CustomApiOperation({
    summary: "공고소개 게시글 상세 조회",
    tags: ["events"],
  })
  @Get("/events/posts/:eventId")
  async getEventById(
    @Param("eventId", ParseIntPipe) eventId: number,
  ): Promise<EventResultDto> {
    return this.eventsService.getEventById(eventId);
  }

  @CustomApiOperation({
    summary: "공고분야 목록 조회",
    tags: ["events"],
  })
  @ApiOkResponse({
    type: BasePaginatedDto(EventCategoryDto, "EventCategory"),
  })
  @Get("/events/categories")
  async getAllEventCategoriesWithPagination(
    @Query() dto: PaginateDto,
  ): Promise<IPaginated<EventCategoryDto>> {
    return this.eventsService.getAllEventCategoriesWithPagination(dto);
  }

  @CustomApiOperation({
    summary: "공고소개 게시글 조회수 올리기",
    tags: ["events"],
  })
  @Post("/events/posts/:eventId/view-count")
  async increaseEventViewCount(
    @Param("eventId", ParseIntPipe) eventId: number,
  ): Promise<number> {
    return this.eventsService.increaseEventViewCount(eventId);
  }
}
