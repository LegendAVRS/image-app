import imageCompression from "browser-image-compression";

export const compressImage = async (imgFile: File) => {
  const options = {
    maxSizeKB: 0.05,
    maxWidthOrHeight: 500,
    useWebWorker: true,
  };

  const compressedFile = await imageCompression(imgFile, options);
  return compressedFile;
};
