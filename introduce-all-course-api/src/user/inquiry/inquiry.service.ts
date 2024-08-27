import { SupabaseService } from "@common/supabase/supabase.service";
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";

@Injectable()
export class InquiryService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async getLatestInquiryFormLink(): Promise<string> {
    const client = this.supabaseService.getClient();
    const { data, error } = await client
      .from("inquiry_form_links")
      .select("*")
      .order("inquiry_form_links_id", { ascending: false })
      .limit(1);

    if (error) {
      throw new InternalServerErrorException(
        error?.message || "상담신청 링크 조회에 실패했습니다.",
      );
    }

    if (!data) {
      throw new NotFoundException("상담신청 링크가 존재하지 않습니다.");
    }

    return data[0].inquiry_form_links_url;
  }
}
