import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";

export const deletePostFromDatabase = async (postId: string) => {
  const postDocRef = doc(db, "postData", postId);
  await deleteDoc(postDocRef);
};
