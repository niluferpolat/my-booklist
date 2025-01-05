import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC6TbKDsVsJosHQxHucqePedw8eaBtPwOQ",
  authDomain: "booklist-11524.firebaseapp.com",
  projectId: "booklist-11524",
  storageBucket: "booklist-11524.firebasestorage.app",
  messagingSenderId: "746294332982",
  appId: "1:746294332982:web:92751057a8f3f85b7f5297",
  measurementId: "G-MGG1BENQE4"
};


// Firebase'i başlat
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
