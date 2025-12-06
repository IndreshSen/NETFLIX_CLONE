// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  setDoc,
  doc,
  collection,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBN8JG9k2S64goqjXfQidYGCgtFtTqzitQ",
  authDomain: "netflix-clone-7e7d1.firebaseapp.com",
  projectId: "netflix-clone-7e7d1",
  storageBucket: "netflix-clone-7e7d1.appspot.com",
  messagingSenderId: "303874194584",
  appId: "1:303874194584:web:cc5057158430258f40e4ed",
  measurementId: "G-7QRNRS1E9S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Only load analytics in browser (and if available)
let analytics = null;
if (typeof window !== "undefined" && firebaseConfig.measurementId) {
  try {
    analytics = getAnalytics(app);
  } catch (err) {
    // analytics can fail in certain environments — safe to ignore
    console.warn("Analytics not initialized:", err);
  }
}

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);

/** helper: friendly error messages */
const friendlyError = (error) => {
  const code = error?.code || "";
  switch (code) {
    case "auth/email-already-in-use":
      return "This email is already in use.";
    case "auth/invalid-email":
      return "Invalid email address.";
    case "auth/weak-password":
      return "Weak password. Use at least 6 characters.";
    case "auth/user-not-found":
      return "No account found with this email.";
    case "auth/wrong-password":
      return "Wrong password. Try again.";
    case "auth/too-many-requests":
      return "Too many attempts. Try again later.";
    default:
      return error?.message || "An unexpected error occurred.";
  }
};

/** SIGNUP */
const signup = async (name, email, password) => {
  try {
    if (!name || typeof name !== "string") {
      throw new Error("Name is required.");
    }
    name = name.trim();
    email = (email || "").trim();

    if (!name) throw new Error("Name cannot be empty.");
    if (!email.includes("@") || !email.includes(".")) {
      throw new Error("Invalid email format.");
    }
    if (!password || password.length < 6) {
      throw new Error("Password must be at least 6 characters.");
    }

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    // Write user doc using UID as document id to avoid duplicates
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name,
      email,
      authProvider: "local",
      createdAt: serverTimestamp(),
    });

    return user;
  } catch (error) {
    console.error("Signup error:", error);
    toast.error(friendlyError(error));
    throw error;
  }
};

/** LOGIN */
const login = async (email, password) => {
  try {
    email = (email || "").trim();

    if (!email.includes("@") || !email.includes(".")) {
      throw new Error("Invalid email format.");
    }
    if (!password || password.length < 6) {
      // allow same message as signup to be consistent
      throw new Error("Password must be at least 6 characters.");
    }

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error("Login error:", error);
    toast.error(friendlyError(error));
    throw error;
  }
};

/** LOGOUT */
const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout error:", error);
    toast.error(friendlyError(error));
    throw error;
  }
};

export { auth, db, login, signup, logout };
