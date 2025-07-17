import imageCompression from "browser-image-compression";

export const convertImageToWebp = async (file: File): Promise<File> => {
  const options = {
    maxSizeMB: 1,            // max size in MB
    maxWidthOrHeight: 1920,  // max width or height (optional)
    useWebWorker: true,      // use multi-threading
    fileType: "image/webp",  // output format
    initialQuality: 0.8,     // compression quality (0-1)
  };

  try {
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  } catch (error) {
    throw error;
  }
};
