import { FIREBASE_AUTH_APIKEY } from "@env";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: FIREBASE_AUTH_APIKEY,
  authDomain: "uniresidence-e1123.firebaseapp.com",
  projectId: "uniresidence-e1123",
  storageBucket: "uniresidence-e1123.firebasestorage.app",
  messagingSenderId: "887718517807",
  appId: "1:887718517807:web:f0081bfde5489f90617ada"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const db = getFirestore(app);

// Function to check login status
const checkUserSession = async (setUser) => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      await ReactNativeAsyncStorage.setItem("userSession", JSON.stringify(user));
      setUser(user);
    } else {
      await ReactNativeAsyncStorage.removeItem("userSession");
      setUser(null);
    }
  });
};

export { auth, db, checkUserSession };