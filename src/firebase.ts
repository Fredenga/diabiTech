import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDlgahi3w8LQ-D3rHNpXnfsqOSLcc8XM3I",
  authDomain: "diabitech-deb82.firebaseapp.com",
  projectId: "diabitech-deb82",
  storageBucket: "diabitech-deb82.appspot.com",
  messagingSenderId: "941769272769",
  appId: "1:941769272769:web:b16c5c88f126281a109340",
  measurementId: "G-F2MFL2WC1R",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
const analytics = getAnalytics(app);
