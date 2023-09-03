import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../config/firebase";

import { Timestamp } from "firebase/firestore";

export const uploadImageToStorage = async (
  imgFile: File,
  storageRef: string,
  specificName?: string
) => {
  let fileName: string;
  if (specificName) fileName = specificName;
  else fileName = Timestamp.now().toDate().toISOString() + imgFile.name;
  const imgFolderRef = ref(storage, `${storageRef}/${fileName}`);

  const snapshot = await uploadBytes(imgFolderRef, imgFile);
  console.log("Uploaded to storage", snapshot.metadata);

  const url = await getDownloadURL(snapshot.ref);
  return { imgUrl: url, snapshot: snapshot };
};
