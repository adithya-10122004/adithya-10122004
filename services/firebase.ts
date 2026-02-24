
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Use the environment API key provided in the context
const firebaseConfig = {
  apiKey: process.env.API_KEY || "AIzaSy-PLACEHOLDER",
  authDomain: "legal-lense-auth.firebaseapp.com",
  projectId: "legal-lense-auth",
  storageBucket: "legal-lense-auth.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};

let auth: any;
try {
  const app = initializeApp(firebaseConfig);
  auth = getAuth(app);
} catch (e) {
  console.error("Firebase initialization failed:", e);
  // Fallback for demo environments where Firebase project might not be fully provisioned
  auth = { currentUser: null };
}

export { 
  auth,
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
};
export type { User };
