"use client";

import { cn } from "@/lib/utils";
import axios from "axios";
import { ImagePlus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { toast } from "sonner";

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
  const [uploadProgress, setUploadProgress] = useState(0);
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

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "food-delivery");
      const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;
      const response = await axios.post(url, formData, {
        onUploadProgress: ({ total, loaded }) => {
          if (total) {
            setUploadProgress((loaded / total) * 100);
          }
        },
      });
      setUploadProgress(0);
      onChange(response.data.secure_url);
    } catch (error) {
      toast.error("Error while uploading image")
      console.log(error);
    } finally {
      onChangeUploadingImage(false);
    }
  };

  return (
    <div className="relative size-28 rounded-md border-2 border-dashed">
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
            "pointer-events-none absolute left-0 top-0 size-full object-cover opacity-80",
            uploadProgress && "opacity-30",
          )}
        />
      )}
      <Button
        disabled={disabled || isImageUploading}
        size="icon"
        variant="ghost"
        type="button"
        className="abs-center rounded-full bg-black/40 hover:bg-black/60"
      >
        <Label htmlFor="file" className="cursor-pointer">
          <ImagePlus className="size-6" />
        </Label>
      </Button>
      {!!uploadProgress && (
        <CircularProgressbar
          value={uploadProgress}
          className="abs_center size-12"
          styles={buildStyles({
            pathColor: "hsl(var(--primary))",
          })}
        />
      )}
    </div>
  );
};