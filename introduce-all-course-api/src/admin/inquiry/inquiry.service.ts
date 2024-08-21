import { Tables } from "@common/database.types";
import { Paginated, PaginateDto } from "@common/pagination";
import { SupabaseService } from "@common/supabase/supabase.service";
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { CreateInquiryFormLinkDto } from "./dtos/create-inquiry-form-link.dto";
import { InquiryFormLinkDto } from "./dtos/inquiry-form-link.dto";

@Injectable()
export class InquiryService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async getAllInquiryFormLinksWithPagination(
    dto: PaginateDto,
  ): Promise<Paginated<InquiryFormLinkDto>> {
    const client = this.supabaseService.getClient();
    const query = client
      .from("inquiry_form_links")
      .select()
      .order("inquiry_form_links_id", { ascending: false })
      .range(
        (dto.page - 1) * dto.itemsPerPage,
        dto.page * dto.itemsPerPage - 1,
      );

    const { data, error } = await query;

    if (error) {
      throw new InternalServerErrorException(
        error.message || "상담신청 링크 조회에 실패했습니다.",
      );
    }

    return new Paginated(
      plainToInstance(InquiryFormLinkDto, data),
      data.length,
      dto.page,
      dto.itemsPerPage,
    );
  }

  async getLatestInquiryFormLink(): Promise<InquiryFormLinkDto> {
    const client = this.supabaseService.getClient();
    const { data, error } = await client
      .from("inquiry_form_links")
      .select("*")
      .order("inquiry_form_links_id", { ascending: false })
      .limit(1);

    if (error) {
      throw new InternalServerErrorException(
        error.message || "상담신청 링크 조회에 실패했습니다.",
      );
    }

    if (!data) {
      throw new NotFoundException("상담신청 링크가 존재하지 않습니다.");
    }

    return plainToInstance(InquiryFormLinkDto, data[0]);
  }

  async createInquiryFormLink(
    adminId: number,
    dto: CreateInquiryFormLinkDto,
  ): Promise<Tables<"inquiry_form_links">> {
    const newLink = {
      ...dto,
      created_by: adminId,
      updated_by: adminId,
    };

    const client = this.supabaseService.getClient();
    const { data, error } = await client
      .from("inquiry_form_links")
      .insert(newLink)
      .select()
      .maybeSingle();

    if (error || !data) {
      throw new NotFoundException(error.message || "생성에 실패했습니다.");
    }

    return data;
  }
}
