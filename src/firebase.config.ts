import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBnvKFIPCSHQvJAOX3p-kdWOohkpT-Feso",
  authDomain: "alta-cms.firebaseapp.com",
  projectId: "alta-cms",
  storageBucket: "alta-cms.appspot.com",
  messagingSenderId: "20470263390",
  appId: "1:20470263390:web:53a76c7673c0f3d8bb4ecf"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);