// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxD6w-6HmuNISCFy0WBhHnjAEwjuvGGyU",
  authDomain: "pokedex-app-985d2.firebaseapp.com",
  projectId: "pokedex-app-985d2",
  storageBucket: "pokedex-app-985d2.firebasestorage.app",
  messagingSenderId: "30842798020",
  appId: "1:30842798020:web:c7df9fa61a3da2fd456e91",
  measurementId: "G-RJBY4Y2NQF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);
