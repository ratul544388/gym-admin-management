"use client";

import { cn } from "@/lib/utils";
import axios from "axios";
import { ImagePlus, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
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
      formData.append("upload_preset", "gym-admin-management");
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
      toast.error("Error while uploading image");
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
            uploadProgress && "opacity-30"
          )}
        />
      )}
      <Button
        disabled={disabled || isImageUploading}
        size="icon"
        variant="outline"
        type="button"
        className="abs-center"
      >
        <Label htmlFor="file" className="cursor-pointer">
          <ImagePlus className="size-6" />
        </Label>
      </Button>
      {previewImage && (
        <Button
          type="button"
          onClick={() => {
            onChange("");
            setPreviewImage("");
          }}
          variant="destructive"
          className="absolute top-0 right-0 size-6"
          size="icon"
        >
          <X className="size-4" />
        </Button>
      )}
      {!!uploadProgress && (
        <CircularProgressbar
          value={uploadProgress}
          className="absolute top-1/2 -translate-y-1/2 size-12"
          styles={buildStyles({
            pathColor: "hsl(var(--primary))",
          })}
        />
      )}
    </div>
  );
};
