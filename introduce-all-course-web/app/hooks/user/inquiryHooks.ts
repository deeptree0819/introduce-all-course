import { ApiError, InquiryFormLinkService } from "@generated/index";
import { useQuery } from "@tanstack/react-query";

export const useGetLatestInquiryFormLink = () => {
  return useQuery<string, ApiError>({
    queryKey: ["inquiry", "form-links"],
    queryFn: () => InquiryFormLinkService.getLatestInquiryFormLink(),
  });
};
