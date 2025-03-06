import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATAJgIgoujZb4ZgeNtEmgoVh6LLF76oHc",
  authDomain: "uniresidence-e1123.firebaseapp.com",
  projectId: "uniresidence-e1123",
  storageBucket: "uniresidence-e1123.firebasestorage.app",
  messagingSenderId: "887718517807",
  appId: "1:887718517807:web:f0081bfde5489f90617ada"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, db };