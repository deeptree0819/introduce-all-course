import { Tables } from "@common/database.types";

export class CreateInquiryFormLinkDto
  implements Pick<Tables<"inquiry_form_links">, "inquiry_form_links_url">
{
  inquiry_form_links_url: string;
}
