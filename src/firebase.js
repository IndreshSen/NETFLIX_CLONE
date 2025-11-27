// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBN8JG9k2S64goqjXfQidYGCgtFtTqzitQ",
  authDomain: "netflix-clone-7e7d1.firebaseapp.com",
  projectId: "netflix-clone-7e7d1",
  storageBucket: "netflix-clone-7e7d1.firebasestorage.app",
  messagingSenderId: "303874194584",
  appId: "1:303874194584:web:cc5057158430258f40e4ed",
  measurementId: "G-7QRNRS1E9S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);