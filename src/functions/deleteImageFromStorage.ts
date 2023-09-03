import { deleteObject, ref } from "firebase/storage";
import { storage } from "../config/firebase";

export const deleteImageFromStorage = async (
  folderName: string,
  imageFileName: string
) => {
  const imgFileRef = ref(storage, `${folderName}/${imageFileName}`);
  await deleteObject(imgFileRef);
};
