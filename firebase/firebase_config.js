// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

// Your web app's Firebase configuration for FUNSOFT
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCOej-dW7WVrZTQ97ATokO5FzUCzGHSvP8",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "funsoft-85c23.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "funsoft-85c23",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "funsoft-85c23.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "453869348301",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:453869348301:web:4c74b5f8d2a4deaa719084"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const authentication = getAuth(app);
export const db = getFirestore(app);
