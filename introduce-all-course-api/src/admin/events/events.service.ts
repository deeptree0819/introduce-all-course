import { Tables } from "@common/database.types";
import { Order } from "@common/enum";
import { Paginated } from "@common/pagination";
import { SupabaseService } from "@common/supabase/supabase.service";
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { CreateEventDto } from "./dtos/create-event.dto";
import { EventSummaryDto } from "./dtos/event-summary.dto";
import { EventDto } from "./dtos/event.dto";
import { GetAllEventsWithPaginationDto } from "./dtos/get-all-events.dto";
import { UpdateEventDto } from "./dtos/update-event.dto";

@Injectable()
export class EventsService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async getAllEventsWithPagination(
    dto: GetAllEventsWithPaginationDto,
  ): Promise<Paginated<EventSummaryDto>> {
    const client = this.supabaseService.getClient();
    const query = client.from("events").select(`
        events_id, 
        event_title, 
        event_categories(event_category_name), 
        event_start_at, 
        event_end_at, 
        event_organization, 
        event_view_count, 
        created_at, 
        created_by
      `);

    if (dto.queryText)
      query.or(
        dto.queryText
          ? `event_title.ilike.%${dto.queryText}%,event_organization.ilike.%${dto.queryText}%`
          : undefined,
      );

    if (dto.orderBy) {
      const ascending = dto.order ? dto.order === Order.ASC : false;
      query.order(dto.orderBy, { ascending });
    }

    query.range(
      (dto.page - 1) * dto.itemsPerPage,
      dto.page * dto.itemsPerPage - 1,
    );

    const { data, error } = await query;

    if (error) {
      throw new InternalServerErrorException(error.message);
    }

    return new Paginated(
      plainToInstance(EventSummaryDto, data),
      data.length,
      dto.page,
      dto.itemsPerPage,
    );
  }

  async getEventById(eventId: number): Promise<EventDto> {
    const client = this.supabaseService.getClient();
    const { data, error } = await client
      .from("events")
      .select()
      .eq("events_id", eventId)
      .maybeSingle();

    if (error) {
      throw new InternalServerErrorException(error.message);
    }

    if (!data) {
      throw new NotFoundException("해당 게시물이 존재하지 않습니다.");
    }

    return plainToInstance(EventDto, data);
  }

  async updateEvent(
    adminId: number,
    eventId: number,
    dto: UpdateEventDto,
  ): Promise<Tables<"events">> {
    const client = this.supabaseService.getClient();
    const { data: event, error: eventSelectError } = await client
      .from("events")
      .select()
      .eq("events_id", eventId)
      .maybeSingle();

    if (eventSelectError || !event) {
      throw new NotFoundException(
        eventSelectError.message || "해당 게시물이 존재하지 않습니다.",
      );
    }

    const { data: eventCategory, error: eventCategoryError } =
      dto.event_category_name
        ? await client
            .from("event_categories")
            .select("event_categories_id")
            .eq("event_category_name", dto.event_category_name)
            .maybeSingle()
        : {
            data: { event_categories_id: event.event_category_id },
            error: null,
          };

    if (eventCategoryError || !eventCategory) {
      throw new InternalServerErrorException(
        eventSelectError.message || "해당 카테고리가 존재하지 않습니다.",
      );
    }

    const updatedEvent = {
      event_thumbnail_url: dto.event_thumbnail_url ?? event.event_thumbnail_url,
      event_organization: dto.event_organization ?? event.event_organization,
      event_category_id: eventCategory.event_categories_id,
      event_title: dto.event_title ?? event.event_title,
      event_start_at: dto.event_start_at ?? event.event_start_at,
      event_end_at: dto.event_end_at ?? event.event_end_at,
      event_poster_image_url:
        dto.event_poster_image_url ?? event.event_poster_image_url,
      event_info: dto.event_info ?? event.event_info,
      event_description: dto.event_description ?? event.event_description,
      updated_at: new Date().toISOString(),
      updated_by: adminId,
    };

    const { data, error: updateError } = await client
      .from("events")
      .update(updatedEvent)
      .eq("events_id", eventId)
      .select()
      .maybeSingle();

    if (updateError || !data) {
      throw new InternalServerErrorException(
        updateError.message || "수정을 실패하였습니다.",
      );
    }

    return data;
  }

  async createEvent(
    adminId: number,
    dto: CreateEventDto,
  ): Promise<Tables<"events">> {
    const event = {
      ...dto,
      created_by: adminId,
      updated_by: adminId,
      event_category_id: dto.event_category_id,
      event_view_count: 0,
    };

    const client = this.supabaseService.getClient();
    const { data, error } = await client
      .from("events")
      .insert(event)
      .select()
      .maybeSingle();

    if (error || !event) {
      throw new NotFoundException(error.message || "작성을 실패하였습니다.");
    }

    return data;
  }
}
