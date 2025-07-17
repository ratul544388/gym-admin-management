"use client";

import { imageUpload } from "@/actions";
import { cn } from "@/lib/utils";
import { ImagePlus } from "lucide-react";
import Image from "next/image";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

interface ImageUploadProps {
  onChange: (value: string) => void;
  disabled?: boolean;
  value?: string;
  isImageUploading: boolean;
  onChangeUploadingImage: (value: boolean) => void;
}

export const ImageUpload = ({
  onChange,
  disabled,
  value,
  isImageUploading,
  onChangeUploadingImage,
}: ImageUploadProps) => {
  const [previewImage, setPreviewImage] = useState(value);
  const [isPending, startTransition] = useTransition();
  const onSelectFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeUploadingImage(true);
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      setPreviewImage(result as string);
    };
    reader.readAsDataURL(file);

    startTransition(async () => {
      try {
        const { secure_url } = await imageUpload(file);
        onChange(secure_url);
      } catch (err) {
        console.error("Upload failed:", err);
        toast.error("Upload failed");
      }
    });
  };

  return (
    <div className="relative size-28 rounded-md border-2 border-dashed bg-muted">
      <input
        id="file"
        type="file"
        accept="image/*"
        className="pointer-events-none size-0 opacity-0"
        onChange={onSelectFile}
      />
      {previewImage && (
        <Image
          src={previewImage}
          alt="Preview image"
          width={112}
          height={112}
          className={cn(
            "absolute left-0 top-0 size-full object-cover opacity-80",
            isPending && "animate-pulse",
          )}
        />
      )}
      <Button
        disabled={disabled || isImageUploading}
        size="icon"
        variant="outline"
        type="button"
        className="abs-center bg-accent hover:bg-gray-300 dark:hover:bg-gray-700"
      >
        <Label htmlFor="file" className="cursor-pointer">
          <ImagePlus className="size-6" />
        </Label>
      </Button>
    </div>
  );
};
