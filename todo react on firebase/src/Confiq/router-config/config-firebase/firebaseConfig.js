
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA0kQWDCh_DIWPjhmgI6SkCMLrXmh_GgHY",
  authDomain: "react-todo-14d57.firebaseapp.com",
  projectId: "react-todo-14d57",
  storageBucket: "react-todo-14d57.appspot.com",
  messagingSenderId: "518178430156",
  appId: "1:518178430156:web:eaefe7689be16e4ab33669",
  measurementId: "G-B7B2R77THL"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);