import { Order } from "@common/enum";
import { Paginated, PaginateDto } from "@common/pagination";
import { SupabaseService } from "@common/supabase/supabase.service";
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { EventCategoryDto } from "./dtos/event-category.dto";
import { EventResultDto } from "./dtos/event-result.dto";
import { EventSummaryDto } from "./dtos/event-summary.dto";
import { GetAllEventsWithPaginationDto } from "./dtos/get-all-events.dto";

@Injectable()
export class EventsService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async getAllEventsWithPagination(
    dto: GetAllEventsWithPaginationDto,
  ): Promise<Paginated<EventSummaryDto>> {
    const client = this.supabaseService.getClient();
    const query = client
      .from("events")
      .select(
        `
        events_id, 
        event_title, 
        event_end_at, 
        event_organization,
        event_thumbnail_url
      `,
      )
      .gte("event_end_at", new Date().toISOString());

    if (dto.eventCategoryId) query.in("event_category_id", dto.eventCategoryId);

    if (dto.excludeEventId) query.neq("events_id", dto.excludeEventId);

    if (dto.orderBy) {
      const ascending = dto.order ? dto.order === Order.ASC : false;
      query.order(dto.orderBy, { ascending });
    } else {
      query.order("events_id", { ascending: false });
    }

    query.range(
      (dto.page - 1) * dto.itemsPerPage,
      dto.page * dto.itemsPerPage - 1,
    );

    const { data, error } = await query;

    if (error) {
      throw new InternalServerErrorException(
        error?.message || "조회를 실패하였습니다.",
      );
    }

    const { count, error: countError } = await client
      .from("events")
      .select("events_id", { count: "exact", head: true });

    if (countError) {
      throw new InternalServerErrorException(
        countError?.message || "전체 개수 조회에 실패하였습니다.",
      );
    }

    return new Paginated(
      plainToInstance(EventSummaryDto, data),
      count,
      dto.page,
      dto.itemsPerPage,
    );
  }

  async getEventById(eventId: number): Promise<EventResultDto> {
    const client = this.supabaseService.getClient();
    const { data, error } = await client
      .from("events")
      .select(
        `
        event_organization,
        event_title,
        event_start_at,
        event_end_at,
        event_poster_image_url,
        event_info,
        event_description,
        event_view_count,
        event_category_id,
        ...event_categories(event_category_name)
        `,
      )
      .eq("events_id", eventId)
      .maybeSingle();

    if (error) {
      throw new InternalServerErrorException(
        error?.message || "조회를 실패하였습니다.",
      );
    }

    if (!data) {
      throw new NotFoundException("해당 게시물이 존재하지 않습니다.");
    }

    const { data: attachments, error: attachmentError } = await client
      .from("event_attachments")
      .select("event_attachment_url")
      .eq("events_id", eventId);

    if (attachmentError) {
      throw new InternalServerErrorException(
        attachmentError?.message || "첨부파일 조회를 실패하였습니다.",
      );
    }

    const result = { ...data, event_attachment_urls: [] };

    if (attachments) {
      result.event_attachment_urls = attachments.map(
        (attachment) => attachment.event_attachment_url,
      );
    }

    return plainToInstance(EventResultDto, result);
  }

  async getAllEventCategoriesWithPagination(
    dto: PaginateDto,
  ): Promise<Paginated<EventCategoryDto>> {
    const client = this.supabaseService.getClient();
    const { data, error } = await client
      .from("event_categories")
      .select()
      .range(
        (dto.page - 1) * dto.itemsPerPage,
        dto.page * dto.itemsPerPage - 1,
      );

    if (error) {
      throw new InternalServerErrorException(
        error?.message || "조회를 실패하였습니다.",
      );
    }

    const { count, error: countError } = await client
      .from("event_categories")
      .select("event_categories_id", { count: "exact", head: true });

    if (countError) {
      throw new InternalServerErrorException(
        countError?.message || "전체 개수 조회에 실패하였습니다.",
      );
    }

    return new Paginated(
      plainToInstance(EventCategoryDto, data),
      count,
      dto.page,
      dto.itemsPerPage,
    );
  }
}
