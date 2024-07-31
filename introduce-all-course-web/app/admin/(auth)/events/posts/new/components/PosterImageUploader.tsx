"use client";

import { cn } from "@utils/common";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";

type PosterImageUploaderProps = {
  className?: string;
};

const PosterImageUploader = ({ className }: PosterImageUploaderProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new window.Image();
        img.onload = () => {
          setAspectRatio(img.width / img.height);
        };
        img.src = reader.result as string;
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={cn(
        "relative flex h-fit w-full items-center justify-center overflow-hidden hover:opacity-90",
        className
      )}
      style={{ paddingBottom: aspectRatio ? `${100 / aspectRatio}%` : 0 }}
      onClick={triggerFileInput}
    >
      <input
        type="file"
        id="poster-image-upload"
        className="absolute inset-0 hidden h-full w-full cursor-pointer opacity-0"
        onChange={handleImageUpload}
        accept="image/*"
        ref={fileInputRef}
      />
      {preview ? (
        <div className="h-full w-full">
          <Image
            src={preview}
            alt="Image Preview"
            className="h-fit w-fit object-cover"
            layout="fill"
            objectFit="cover"
          />
        </div>
      ) : (
        <div className="flex h-[91px] w-full flex-col items-center rounded-lg border-2 border-dashed border-slate-200 p-5 text-sm text-muted-foreground">
          <ImageIcon />
          <span>이미지를 업로드해주세요.</span>
        </div>
      )}
    </div>
  );
};

export default PosterImageUploader;
