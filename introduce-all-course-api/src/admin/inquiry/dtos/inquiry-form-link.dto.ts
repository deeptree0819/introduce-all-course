import { Tables } from "@common/database.types";

export class InquiryFormLinkDto
  implements Omit<Tables<"inquiry_form_links">, "created_by" | "updated_by">
{
  inquiry_form_links_id: number;
  created_at: string;
  created_by: { admin_name: string };
  updated_at: string;
  updated_by: { admin_name: string };
  inquiry_form_links_url: string;
}
