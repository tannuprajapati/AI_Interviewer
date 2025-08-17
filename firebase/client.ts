// Import the functions you need from the SDKs you need
import { initializeApp , getApp , getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfM0JDw2FkvWQYcy8JeoTxV__czZ4GStM",
  authDomain: "prepwise-f8012.firebaseapp.com",
  projectId: "prepwise-f8012",
  storageBucket: "prepwise-f8012.firebasestorage.app",
  messagingSenderId: "276223935020",
  appId: "1:276223935020:web:446b8116b57279ea508789",
  measurementId: "G-DEE47228SK"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);

export const db = getFirestore(app);