// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5q7SxHep91VtYuGKOaxc0udnOoctjnFs",
  authDomain: "image-app-f9ca8.firebaseapp.com",
  projectId: "image-app-f9ca8",
  storageBucket: "image-app-f9ca8.appspot.com",
  messagingSenderId: "855947066324",
  appId: "1:855947066324:web:131ad04881f41045b77441",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleAuth = new GoogleAuthProvider();
