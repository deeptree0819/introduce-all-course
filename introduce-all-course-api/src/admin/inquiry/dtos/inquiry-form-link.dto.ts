import { Tables } from "@common/database.types";

export class InquiryFormLinkDto implements Tables<"inquiry_form_links"> {
  inquiry_form_links_id: number;
  created_at: string;
  created_by: number;
  updated_at: string;
  updated_by: number;
  inquiry_form_links_url: string;
}
