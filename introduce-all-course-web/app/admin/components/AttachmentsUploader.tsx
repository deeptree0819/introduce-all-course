import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

import { Button, buttonVariants } from "@/components/ui/button";

const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500MB
const MAX_FILE_COUNT = 10;

type AttachmentsUploaderProps = {
  fileState: [File[], Dispatch<SetStateAction<File[]>>];
};

const AttachmentsUploader = ({ fileState }: AttachmentsUploaderProps) => {
  const [files, setFiles] = fileState;
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      const totalFiles = files.length + newFiles.length;

      if (totalFiles > MAX_FILE_COUNT) {
        setError(`파일은 최대 ${MAX_FILE_COUNT}개까지 업로드 가능합니다.`);
        return;
      }

      const validFiles = newFiles.filter((file) => file.size <= MAX_FILE_SIZE);

      if (validFiles.length !== newFiles.length) {
        setError(
          `${MAX_FILE_SIZE / (1024 * 1024)} MB 이하의 파일만 업로드 가능합니다.`
        );
      }

      setFiles((prevFiles) => [...prevFiles, ...validFiles]);
    }
  };

  const handleDeleteFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleFileClick = (file: File) => {
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL, "_blank");
  };

  return (
    <div className="flex flex-col items-start">
      <div className="flex flex-row items-center space-x-3">
        <label
          htmlFor="attachments-upload"
          className={buttonVariants({ variant: "outline", size: "sm" })}
        >
          {files.length > 0 ? `${files.length}개 선택됨` : "파일 업로드"}
        </label>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
      <input
        id="attachments-upload"
        type="file"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />
      {files.length > 0 && (
        <ul className="ml-3 mt-2 w-80 space-y-3 text-gray-700">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-end justify-between space-x-5 text-sm"
            >
              <span
                className="line-clamp-1 w-full cursor-pointer"
                onClick={() => handleFileClick(file)}
              >
                {file.name}
              </span>
              <Button
                variant="link"
                size="sm"
                className="h-fit pr-20 text-xs text-red-600"
                onClick={() => handleDeleteFile(index)}
              >
                삭제
              </Button>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AttachmentsUploader;
