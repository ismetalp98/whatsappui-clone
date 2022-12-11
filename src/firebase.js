// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, } from 'firebase/firestore';
import { getAuth, } from 'firebase/auth';
import { GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqcxH9hXZPh0ne7-WpYlxLKpAMuVkAuyc",
  authDomain: "cs411-96d88.firebaseapp.com",
  projectId: "cs411-96d88",
  storageBucket: "cs411-96d88.appspot.com",
  messagingSenderId: "546021393473",
  appId: "1:546021393473:web:c7fdb9e4a0a099279ff2c0",
  measurementId: "G-8C6E07X2NT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, provider };
export default getFirestore();
