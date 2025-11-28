// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBN8JG9k2S64goqjXfQidYGCgtFtTqzitQ",
  authDomain: "netflix-clone-7e7d1.firebaseapp.com",
  projectId: "netflix-clone-7e7d1",
  storageBucket: "netflix-clone-7e7d1.firebasestorage.app",
  messagingSenderId: "303874194584",
  appId: "1:303874194584:web:cc5057158430258f40e4ed",
  measurementId: "G-7QRNRS1E9S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Only load analytics in browser
let analytics = null;
try {
  analytics = getAnalytics(app);
} catch (err) {}

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);

/** SIGNUP */
const signup = async (name, email, password) => {
  try {
    // clean input
    name = name.trim();
    email = email.trim();

    if (!email.includes("@") || !email.includes(".")) {
      throw new Error("Invalid email format.");
    }

    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters.");
    }

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      email,
      authProvider: "local",
      createdAt: new Date().toISOString(),
    });

    return user;
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
};

/** LOGIN */
const login = async (email, password) => {
  try {
    email = email.trim();

    if (!email.includes("@") || !email.includes(".")) {
      throw new Error("Invalid email format.");
    }

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

/** LOGOUT */
const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};

export { auth, db, login, signup, logout };
