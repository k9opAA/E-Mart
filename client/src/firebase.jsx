import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDAIuyvA-Ouvky0pss1fERZzf1MHskkimU",
  authDomain: "e-mart-69550.firebaseapp.com",
  projectId: "e-mart-69550",
  storageBucket: "e-mart-69550.firebasestorage.app",
  messagingSenderId: "906246085664",
  appId: "1:906246085664:web:fe03f1abb775e62f967045"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;