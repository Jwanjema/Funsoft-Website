// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

// Your web app's Firebase configuration for FUNSOFT
const firebaseConfig = {
  apiKey: "AIzaSyCOej-dW7WVrZTQ97ATokO5FzUCzGHSvP8",
  authDomain: "funsoft-85c23.firebaseapp.com",
  projectId: "funsoft-85c23",
  storageBucket: "funsoft-85c23.firebasestorage.app",
  messagingSenderId: "453869348301",
  appId: "1:453869348301:web:4c74b5f8d2a4deaa719084"
  // Note: measurementId is for Analytics only, not needed for Auth/Firestore
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const authentication = getAuth(app);
export const db = getFirestore(app);

// Optional: Log which project is being used
console.log("Firebase initialized with project:", firebaseConfig.projectId);