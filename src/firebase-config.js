import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAOgq-ScUBVNkaw486VERaf4_HYQKUqCp4",
  authDomain: "auth-login-webrekicks.firebaseapp.com",
  projectId: "auth-login-webrekicks",
  storageBucket: "auth-login-webrekicks.firebasestorage.app",
  messagingSenderId: "458065478796",
  appId: "1:458065478796:web:cc0c32a17b336ab054a7a9",
  measurementId: "G-K3L77CV1VN"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };