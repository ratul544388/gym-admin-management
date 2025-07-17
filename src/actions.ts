"use server";

import { UploadApiResponse } from "cloudinary";
import cloudinary from "./lib/cloudinary";

export const imageUpload = async (file: File): Promise<UploadApiResponse> => {
  console.time("Total Server Action Time");

  console.time("Buffering Time");
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);
  console.timeEnd("Buffering Time");

  console.time("Cloudinary Upload Time");
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
