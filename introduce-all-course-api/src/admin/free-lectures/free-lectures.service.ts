import { Tables } from "@common/database.types";
import { Order } from "@common/enum";
import { Paginated, PaginateDto } from "@common/pagination";
import { SupabaseService } from "@common/supabase/supabase.service";
import { YoutubeService } from "@common/youtube/youtube.service";
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { CreateFreeLectureTagDto } from "./dtos/create-free-lecture-tag.dto";
import { CreateFreeLectureDto } from "./dtos/create-free-lecture.dto";
import { FreeLectureResultDto } from "./dtos/free-lecture-result.dto";
import { FreeLectureSummaryDto } from "./dtos/free-lecture-summary.dto";
import { FreeLectureTagDto } from "./dtos/free-lecture-tag.dto";
import { FreeLectureDto } from "./dtos/free-lecture.dto";
import { GetAllFreeLecturesWithPaginationDto } from "./dtos/get-all-free-lectures.dto";
import { UpdateFreeLectureDto } from "./dtos/update-free-lecture.dto";

@Injectable()
export class FreeLecturesService {
  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly youtubeService: YoutubeService,
  ) {}

  async getAllFreeLecturesWithPagination(
    dto: GetAllFreeLecturesWithPaginationDto,
  ): Promise<Paginated<FreeLectureSummaryDto>> {
    const client = this.supabaseService.getClient();
    const query = client.from("free_lecture").select(`
      *,
      created_by:admins!free_lecture_created_by_fkey(admin_name, admin_id),
      free_lecture_tags(free_lecture_tags_id, free_lecture_tag_name)
      `);

    if (dto.freeLectureTagId) {
      const { data: lectureIds, error: lectureIdsError } = await client
        .from("free_lecture_free_lecture_tags")
        .select("free_lecture_id")
        .eq("free_lecture_tags_id", dto.freeLectureTagId);

      if (lectureIdsError) {
        throw new InternalServerErrorException(
          lectureIdsError?.message || "태그별 조회를 실패하였습니다.",
        );
      }

      query.in(
        "free_lecture_id",
        lectureIds.map((row) => row.free_lecture_id),
      );
    }

    if (dto.queryText)
      query.or(
        dto.queryText
          ? `free_lecture_title.ilike.%${dto.queryText}%,free_lecture_url.ilike.%${dto.queryText}%`
          : undefined,
      );

    if (dto.orderBy) {
      const ascending = dto.order ? dto.order === Order.ASC : false;
      query.order(dto.orderBy, { ascending });
    } else {
      query.order("free_lecture_id", { ascending: false });
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

    const updates = await this.youtubeService.getVideoViewCounts(data);

    if (updates.length > 0) {
      const rest = updates.map(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ({ free_lecture_tags, created_by, ...rest }) => ({
          ...rest,
          created_by: created_by.admin_id,
        }),
      );

      const { error: updateError } = await client
        .from("free_lecture")
        .upsert(rest, { onConflict: "free_lecture_id" });

      if (updateError) {
        throw new InternalServerErrorException(
          updateError?.message || "조회수 업데이트를 실패하였습니다.",
        );
      }
    }

    return new Paginated(
      plainToInstance(FreeLectureSummaryDto, updates),
      updates.length,
      dto.page,
      dto.itemsPerPage,
    );
  }

  async getFreeLectureById(postId: number): Promise<FreeLectureResultDto> {
    const client = this.supabaseService.getClient();
    const { data, error } = await client
      .from("free_lecture")
      .select(
        `
        *, 
        created_by:admins!free_lecture_created_by_fkey(admin_name),
        updated_by:admins!free_lecture_updated_by_fkey(admin_name),
        free_lecture_tags(free_lecture_tags_id, free_lecture_tag_name)
        `,
      )
      .eq("free_lecture_id", postId)
      .maybeSingle();

    if (error) {
      throw new InternalServerErrorException(
        error?.message || "조회를 실패하였습니다.",
      );
    }

    if (!data) {
      throw new NotFoundException("해당 게시물이 존재하지 않습니다.");
    }

    return plainToInstance(FreeLectureResultDto, data);
  }

  async updateFreeLecture(
    adminId: number,
    postId: number,
    dto: UpdateFreeLectureDto,
  ): Promise<FreeLectureResultDto> {
    const client = this.supabaseService.getClient();
    const { data: freeLecture, error: freeLectureSelectError } = await client
      .from("free_lecture")
      .select()
      .eq("free_lecture_id", postId)
      .maybeSingle();

    if (freeLectureSelectError || !freeLecture) {
      throw new NotFoundException(
        freeLectureSelectError?.message || "해당 게시물이 존재하지 않습니다.",
      );
    }

    if (!!dto.free_lecture_tags && dto.free_lecture_tags.length !== 0) {
      const { error: deleteError } = await client
        .from("free_lecture_free_lecture_tags")
        .delete()
        .eq("free_lecture_id", postId);

      if (deleteError) {
        throw new InternalServerErrorException(
          deleteError?.message || "태그 수정을 실패하였습니다.",
        );
      }

      const newTags = dto.free_lecture_tags?.map((tag) => ({
        free_lecture_id: postId,
        free_lecture_tags_id: tag,
      }));

      if (newTags) {
        const { error: insertError } = await client
          .from("free_lecture_free_lecture_tags")
          .insert(newTags);

        if (insertError) {
          throw new InternalServerErrorException(
            insertError?.message || "태그 수정을 실패하였습니다.",
          );
        }
      }
    }

    const updatedFreeLecture = {
      free_lecture_description:
        dto.free_lecture_description || freeLecture.free_lecture_description,
      free_lecture_thumbnail_url:
        dto.free_lecture_thumbnail_url ||
        freeLecture.free_lecture_thumbnail_url,
      free_lecture_title:
        dto.free_lecture_title || freeLecture.free_lecture_title,
      free_lecture_url: dto.free_lecture_url || freeLecture.free_lecture_url,
      updated_at: new Date().toISOString(),
      updated_by: adminId,
    };

    const { data: post, error: updateError } = await client
      .from("free_lecture")
      .update(updatedFreeLecture)
      .eq("free_lecture_id", postId)
      .select(
        `
        *, 
        created_by:admins!free_lecture_created_by_fkey(admin_name),
        updated_by:admins!free_lecture_updated_by_fkey(admin_name),
        free_lecture_tags(free_lecture_tags_id, free_lecture_tag_name)
        `,
      )
      .maybeSingle();

    if (updateError || !post) {
      throw new InternalServerErrorException(
        updateError?.message || "수정을 실패하였습니다.",
      );
    }

    return post;
  }

  async createFreeLecture(
    adminId: number,
    dto: CreateFreeLectureDto,
  ): Promise<FreeLectureDto> {
    const { free_lecture_tags, ...rest } = dto;

    const newPost = {
      ...rest,
      created_by: adminId,
      updated_by: adminId,
      free_lecture_view_count: 0,
    };

    const client = this.supabaseService.getClient();
    const { data: post, error: postError } = await client
      .from("free_lecture")
      .insert(newPost)
      .select(
        `
      *,
      created_by:admins!free_lecture_created_by_fkey(admin_name),
      updated_by:admins!free_lecture_updated_by_fkey(admin_name)
      `,
      )
      .maybeSingle();

    if (postError || !post) {
      throw new InternalServerErrorException(
        postError?.message || "작성을 실패하였습니다.",
      );
    }

    const newTags = free_lecture_tags.map((tag) => ({
      free_lecture_id: post.free_lecture_id,
      free_lecture_tags_id: tag,
    }));

    const { error: insertError } = await client
      .from("free_lecture_free_lecture_tags")
      .insert(newTags);

    if (insertError) {
      throw new InternalServerErrorException(
        insertError?.message || "태그 추가를 실패하였습니다.",
      );
    }

    return post;
  }

  async deleteFreeLecture(postId: number): Promise<void> {
    const client = this.supabaseService.getClient();
    const { error } = await client
      .from("free_lecture")
      .delete()
      .eq("free_lecture_id", postId);

    if (error) {
      throw new InternalServerErrorException(
        error?.message || "삭제를 실패하였습니다.",
      );
    }
  }

  async getAllFreeLectureTagsWithPagination(
    dto: PaginateDto,
  ): Promise<Paginated<FreeLectureTagDto>> {
    const client = this.supabaseService.getClient();
    const { data, error } = await client
      .from("free_lecture_tags")
      .select()
      .order("free_lecture_tags_id", { ascending: false })
      .range(
        (dto.page - 1) * dto.itemsPerPage,
        dto.page * dto.itemsPerPage - 1,
      );

    if (error) {
      throw new InternalServerErrorException(
        error?.message || "조회를 실패하였습니다.",
      );
    }

    return new Paginated(
      plainToInstance(FreeLectureTagDto, data),
      data.length,
      dto.page,
      dto.itemsPerPage,
    );
  }

  async getFreeLectureTagById(
    FreeLectureTagId: number,
  ): Promise<FreeLectureTagDto> {
    const client = this.supabaseService.getClient();
    const { data, error } = await client
      .from("free_lecture_tags")
      .select()
      .eq("free_lecture_tags_id", FreeLectureTagId)
      .maybeSingle();

    if (error) {
      throw new InternalServerErrorException(
        error?.message || "태그 조회를 실패하였습니다.",
      );
    }

    return plainToInstance(FreeLectureTagDto, data);
  }

  async createFreeLectureTag(
    dto: CreateFreeLectureTagDto,
  ): Promise<Tables<"free_lecture_tags">> {
    const client = this.supabaseService.getClient();
    const { count } = await client
      .from("free_lecture_tags")
      .select("*", { count: "exact", head: true });

    if (count >= 100) {
      throw new BadRequestException("공고 분야는 100개까지 등록 가능합니다.");
    }

    const { data, error } = await client
      .from("free_lecture_tags")
      .insert(dto)
      .select()
      .maybeSingle();

    if (error || !data) {
      throw new NotFoundException(error?.message || "등록을 실패하였습니다.");
    }

    return data;
  }

  async deleteFreeLectureTag(FreeLectureTagId: number): Promise<void> {
    const client = this.supabaseService.getClient();
    const { error: deleteError } = await client
      .from("free_lecture_tags")
      .delete()
      .eq("free_lecture_tags_id", FreeLectureTagId);

    if (deleteError) {
      throw new InternalServerErrorException(
        deleteError?.message || "삭제를 실패하였습니다.",
      );
    }
  }

  async getFreeLectureTagPostCount(FreeLectureTagId: number): Promise<number> {
    const client = this.supabaseService.getClient();
    const { count, error } = await client
      .from("free_lecture_free_lecture_tags")
      .select("free_lecture_id", { count: "exact", head: true })
      .eq("free_lecture_tags_id", FreeLectureTagId);

    if (error) {
      throw new InternalServerErrorException(
        error?.message || "게시물수 조회를 실패하였습니다.",
      );
    }

    return count;
  }
}
