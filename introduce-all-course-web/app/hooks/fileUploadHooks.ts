import { ApiError } from "@generated/index";
import { useMutation } from "@tanstack/react-query";
import { toastApiError } from "@toast";
import { getUploadUrl } from "@utils/common";
import axios from "axios";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB limit

export const useUploadImage = (tag: string) => {
  return useMutation({
    mutationFn: async (file: File) => {
      if (file.size > MAX_FILE_SIZE) {
        throw new Error("파일 사이즈는 10MB 이하여야 합니다.");
      }

      const url = await getUploadUrl(tag, file.type);

      try {
        await axios.put(url, file, {
          headers: {
            "Content-Type": file.type,
          },
        });
      } catch (error) {
        console.error(error);
      }

      return url.split("?")[0];
    },
    onError: (error: ApiError) => {
      toastApiError(error, "사진 업로드에 실패했습니다.");
    },
  });
};
