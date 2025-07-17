import imageCompression from "browser-image-compression";

export const convertImageToWebp = async (file: File): Promise<File> => {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    fileType: "image/webp",
    initialQuality: 0.8,
  };

  const compressedFile = await imageCompression(file, options);
  return compressedFile;
};