import { Tables } from "@common/database.types";
import { Order } from "@common/enum";
import { Paginated, PaginateDto } from "@common/pagination";
import { SupabaseService } from "@common/supabase/supabase.service";
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { AdminCreateEventCategoryDto } from "./dtos/admin-create-event-category.dto";
import { AdminCreateEventDto } from "./dtos/admin-create-event.dto";
import { AdminDeleteEventCategoryDto } from "./dtos/admin-delete-event-category.dto";
import { AdminEventCategoryDto } from "./dtos/admin-event-category.dto";
import { AdminEventResultDto } from "./dtos/admin-event-result.dto";
import { AdminEventSummaryDto } from "./dtos/admin-event-summary.dto";
import { AdminGetAllEventsWithPaginationDto } from "./dtos/admin-get-all-events.dto";
import { AdminUpdateEventDto } from "./dtos/admin-update-event.dto";

@Injectable()
export class EventsService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async getAllEventsWithPagination(
    dto: AdminGetAllEventsWithPaginationDto,
  ): Promise<Paginated<AdminEventSummaryDto>> {
    const client = this.supabaseService.getClient();
    const query = client.from("events").select(`
        events_id, 
        event_title, 
        ...event_categories(event_category_name), 
        event_start_at, 
        event_end_at, 
        event_organization, 
        event_view_count, 
        created_at,
        created_by:admins!events_created_by_fkey(admin_name)
      `);

    if (dto.eventCategoryId) query.eq("event_category_id", dto.eventCategoryId);

    if (dto.queryText)
      query.or(
        dto.queryText
          ? `event_title.ilike.%${dto.queryText}%,event_organization.ilike.%${dto.queryText}%`
          : undefined,
      );

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
      plainToInstance(AdminEventSummaryDto, data),
      count,
      dto.page,
      dto.itemsPerPage,
    );
  }

  async getEventById(eventId: number): Promise<AdminEventResultDto> {
    const client = this.supabaseService.getClient();
    const { data, error } = await client
      .from("events")
      .select(
        `
        *, 
        created_by:admins!events_created_by_fkey(admin_name),
        updated_by:admins!events_updated_by_fkey(admin_name)
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

    return plainToInstance(AdminEventResultDto, result);
  }

  async updateEvent(
    adminId: number,
    eventId: number,
    dto: AdminUpdateEventDto,
  ): Promise<AdminEventResultDto> {
    const client = this.supabaseService.getClient();
    const { data: event, error: eventSelectError } = await client
      .from("events")
      .select()
      .eq("events_id", eventId)
      .maybeSingle();

    if (eventSelectError || !event) {
      throw new NotFoundException(
        eventSelectError?.message || "해당 게시물이 존재하지 않습니다.",
      );
    }

    const { error: attachmentError } = await client
      .from("event_attachments")
      .delete()
      .eq("events_id", eventId);

    if (attachmentError) {
      throw new InternalServerErrorException(
        attachmentError?.message || "첨부파일 업로드를 실패하였습니다.",
      );
    }

    const { event_attachment_urls } = dto;

    const { data: newAttachment, error: newAttachmentError } = await client
      .from("event_attachments")
      .insert(
        event_attachment_urls.map((url) => ({
          events_id: eventId,
          event_attachment_url: url,
        })),
      )
      .select();

    if (newAttachmentError || !newAttachment) {
      throw new InternalServerErrorException(
        newAttachmentError?.message || "첨부파일 업로드를 실패하였습니다.",
      );
    }

    const updatedEvent = {
      event_thumbnail_url: dto.event_thumbnail_url ?? event.event_thumbnail_url,
      event_organization: dto.event_organization ?? event.event_organization,
      event_category_id: dto.event_category_id,
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

    const { data: post, error: updateError } = await client
      .from("events")
      .update(updatedEvent)
      .eq("events_id", eventId)
      .select(
        `*,
        created_by:admins!events_created_by_fkey(admin_name),
        updated_by:admins!events_updated_by_fkey(admin_name)`,
      )
      .maybeSingle();

    if (updateError || !post) {
      throw new InternalServerErrorException(
        updateError?.message || "수정을 실패하였습니다.",
      );
    }

    return { ...post, event_attachment_urls };
  }

  async createEvent(
    adminId: number,
    dto: AdminCreateEventDto,
  ): Promise<AdminEventResultDto> {
    const { event_attachment_urls, ...rest } = dto;
    const event = {
      ...rest,
      created_by: adminId,
      updated_by: adminId,
      event_category_id: dto.event_category_id,
      event_view_count: 0,
    };

    const client = this.supabaseService.getClient();
    const { data: post, error: postError } = await client
      .from("events")
      .insert(event)
      .select(
        `
        *,
        created_by:admins!events_created_by_fkey(admin_name),
        updated_by:admins!events_updated_by_fkey(admin_name)
      `,
      )
      .maybeSingle();

    if (postError || !post) {
      throw new InternalServerErrorException(
        postError?.message || "작성을 실패하였습니다.",
      );
    }

    const { data: attachment, error: attachmentError } = await client
      .from("event_attachments")
      .insert(
        event_attachment_urls.map((url) => ({
          events_id: post.events_id,
          event_attachment_url: url,
        })),
      )
      .select();

    if (attachmentError || !attachment) {
      throw new InternalServerErrorException(
        attachmentError?.message || "첨부파일 업로드를 실패하였습니다.",
      );
    }

    return { ...post, event_attachment_urls };
  }

  async deleteEvent(eventId: number): Promise<void> {
    const client = this.supabaseService.getClient();
    const { error } = await client
      .from("events")
      .delete()
      .eq("events_id", eventId);

    if (error) {
      throw new InternalServerErrorException(
        error?.message || "삭제를 실패하였습니다.",
      );
    }
  }

  async getAllEventCategoriesWithPagination(
    dto: PaginateDto,
  ): Promise<Paginated<AdminEventCategoryDto>> {
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
      plainToInstance(AdminEventCategoryDto, data),
      count,
      dto.page,
      dto.itemsPerPage,
    );
  }

  async getEventCategoryById(
    eventCategoriesId: number,
  ): Promise<AdminEventCategoryDto> {
    const client = this.supabaseService.getClient();
    const { data, error } = await client
      .from("event_categories")
      .select()
      .eq("event_categories_id", eventCategoriesId)
      .maybeSingle();

    if (error) {
      throw new InternalServerErrorException(
        error?.message || "조회를 실패하였습니다.",
      );
    }

    return plainToInstance(AdminEventCategoryDto, data);
  }

  async createEventCategory(
    dto: AdminCreateEventCategoryDto,
  ): Promise<Tables<"event_categories">> {
    const client = this.supabaseService.getClient();
    const { count } = await client
      .from("event_categories")
      .select("*", { count: "exact", head: true });

    if (count >= 30) {
      throw new BadRequestException("공고 분야는 30개까지 등록 가능합니다.");
    }

    const { data, error } = await client
      .from("event_categories")
      .insert(dto)
      .select()
      .maybeSingle();

    if (error || !data) {
      throw new NotFoundException(error?.message || "등록을 실패하였습니다.");
    }

    return data;
  }

  async deleteEventCategory(
    eventCategoriesId: number,
    dto: AdminDeleteEventCategoryDto,
  ): Promise<void> {
    const client = this.supabaseService.getClient();
    const { error: updateError } = await client
      .from("events")
      .update({ event_category_id: dto.move_category_id })
      .eq("event_category_id", eventCategoriesId);

    if (updateError) {
      throw new InternalServerErrorException(
        updateError?.message || "게시물 이동을 실패하였습니다.",
      );
    }

    const { error: deleteError } = await client
      .from("event_categories")
      .delete()
      .eq("event_categories_id", eventCategoriesId);

    if (deleteError) {
      throw new InternalServerErrorException(
        deleteError?.message || "삭제를 실패하였습니다.",
      );
    }
  }

  async getEventCategoryPostCount(eventCategoryId: number): Promise<number> {
    const client = this.supabaseService.getClient();
    const { count, error } = await client
      .from("events")
      .select("events_id", { count: "exact", head: true })
      .eq("event_category_id", eventCategoryId);

    if (error) {
      throw new InternalServerErrorException(
        error?.message || "조회를 실패하였습니다.",
      );
    }

    return count;
  }
}
