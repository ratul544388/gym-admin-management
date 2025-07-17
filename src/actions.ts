"use server";

import { UploadApiResponse } from "cloudinary";
import cloudinary from "./lib/cloudinary";

export const imageUpload = async (file: File): Promise<UploadApiResponse> => {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  const result: UploadApiResponse = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: "gym-admin-management",
        },
        (error, result) => {
          if (result) {
            return resolve(result);
          } else {
            reject(error);
          }
        },
      )
      .end(buffer);
  });

  return result;
};