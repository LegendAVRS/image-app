import { addDoc, collection } from "firebase/firestore";
import { db } from "../config/firebase";

export const uploadPostToDatabase = async (
  name: string,
  tags: string[],
  thumbImgUrl: string,
  realImgUrl: string,
  imgFileName: string,
  time: any
) => {
  const postCollectionRef = collection(db, "postData");

  const res = await addDoc(postCollectionRef, {
    name: name,
    tags: tags,
    thumbImgUrl: thumbImgUrl,
    realImgUrl: realImgUrl,
    imgFileName: imgFileName,
    time: time,
  });
  console.log("Post uploaded");
  return res;

  return null;
};
