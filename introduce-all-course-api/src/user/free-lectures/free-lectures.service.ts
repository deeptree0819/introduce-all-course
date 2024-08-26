import { Order } from "@common/enum";
import { Paginated, PaginateDto } from "@common/pagination";
import { SupabaseService } from "@common/supabase/supabase.service";
import { YoutubeService } from "@common/youtube/youtube.service";
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { FreeLectureResultDto } from "./dtos/free-lecture-result.dto";
import { FreeLectureSummaryDto } from "./dtos/free-lecture-summary.dto";
import { FreeLectureTagDto } from "./dtos/free-lecture-tag.dto";
import { GetAllFreeLecturesWithPaginationDto } from "./dtos/get-all-free-lectures.dto";

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

    if (!!dto.freeLectureTagIds && !!dto.freeLectureTagIds.length) {
      const { data: lectureIds, error: lectureIdsError } = await client
        .from("free_lecture_free_lecture_tags")
        .select("free_lecture_id")
        .in("free_lecture_tags_id", dto.freeLectureTagIds);

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

    if (!!updates.length) {
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

    const { count, error: countError } = await client
      .from("free_lecture")
      .select("free_lecture_id", { count: "exact", head: true });

    if (countError) {
      throw new InternalServerErrorException(
        countError?.message || "전체 개수 조회에 실패하였습니다.",
      );
    }

    return new Paginated(
      plainToInstance(FreeLectureSummaryDto, updates),
      count,
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
        free_lecture_tags(free_lecture_tag_name)
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

    const { count, error: countError } = await client
      .from("free_lecture_tags")
      .select("free_lecture_tags_id", { count: "exact", head: true });

    if (countError) {
      throw new InternalServerErrorException(
        countError?.message || "전체 개수 조회에 실패하였습니다.",
      );
    }

    return new Paginated(
      plainToInstance(FreeLectureTagDto, data),
      count,
      dto.page,
      dto.itemsPerPage,
    );
  }
}
