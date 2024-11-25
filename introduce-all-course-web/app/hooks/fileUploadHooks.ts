import { ApiError } from "@generated/index";
import { useMutation } from "@tanstack/react-query";
import { toastApiError } from "@toast";
import { getUploadUrl } from "@utils/common";
import axios from "axios";

const MAX_IMAGE_SIZE = 50 * 1024 * 1024; // 50 MB limit

export const useUploadImage = (tag: string) => {
  return useMutation({
    mutationFn: async (file: File) => {
      if (file.size > MAX_IMAGE_SIZE) {
        throw new Error(
          `이미지 사이즈는 ${MAX_IMAGE_SIZE / (1024 * 1024)}MB 이하여야 합니다.`
        );
      }

      const url = await getUploadUrl({
        tag,
        contentType: file.type,
        fileName: file.name,
      });

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

const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500 MB limit

export const useUploadFile = (tag: string) => {
  return useMutation({
    mutationFn: async (file: File) => {
      if (file.size > MAX_FILE_SIZE) {
        throw new Error(
          `파일 사이즈는 ${MAX_IMAGE_SIZE / (1024 * 1024)}MB 이하여야 합니다.`
        );
      }

      const url = await getUploadUrl({
        tag,
        contentType: file.type,
        fileName: file.name,
      });

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
      toastApiError(error, "파일 업로드에 실패했습니다.");
    },
  });
};
