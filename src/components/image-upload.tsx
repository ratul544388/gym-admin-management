"use client";

import { imageUpload } from "@/actions";
import { convertImageToWebp } from "@/lib/convert-image-to-webp";
import { cn } from "@/lib/utils";
import { ImagePlus, Loader, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";

interface ImageUploadProps {
  onChange: (value: string) => void;
  disabled?: boolean;
  value?: string;
  onChangeUploadingImage: (value: boolean) => void;
}

export const ImageUpload = ({
  onChange,
  disabled,
  value,
  onChangeUploadingImage,
}: ImageUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState(value);
  const [isPending, startTransition] = useTransition();

  const onSelectFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    startTransition(async () => {
      try {
        const file = e.target.files?.[0];
        if (!file) return;

        onChangeUploadingImage(true);
        const previewUrl = URL.createObjectURL(file);
        setPreviewImage(previewUrl);

        const webpFile = await convertImageToWebp(file);
        const { secure_url } = await imageUpload(webpFile);
        onChange(secure_url);
      } catch (err) {
        console.error("Upload or conversion failed:", err);
        toast.error("Image upload failed");
      } finally {
        onChangeUploadingImage(false);
      }
    });
  };

  return (
    <div
      role="button"
      onClick={() => inputRef.current?.click()}
      className={cn(
        "group relative flex size-28 items-center justify-center rounded-md border-2 border-dashed bg-muted",
        (disabled || isPending) && "pointer-events-none opacity-60",
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="pointer-events-none absolute opacity-0"
        onChange={onSelectFile}
      />
      {previewImage && (
        <Image
          src={previewImage}
          alt="Preview image"
          width={112}
          height={112}
          className={cn(
            "absolute left-0 top-0 size-full bg-accent object-cover opacity-80",
            isPending && "animate-pulse",
          )}
        />
      )}
      {!previewImage && !isPending && (
        <span className="group inline-block rounded-full bg-accent/70 p-3 transition-all group-hover:bg-accent">
          <ImagePlus className="size-4" />
        </span>
      )}
      {value && (
        <Button
          onClick={(e) => {
            e.stopPropagation();
            setPreviewImage("");
            onChange("");
          }}
          className="absolute right-0 top-0 size-7 rounded-full"
          variant="outline"
          size="icon"
        >
          <X className="size-4" />
        </Button>
      )}
      {isPending && <Loader className="size-4 animate-spin" />}
    </div>
  );
};
