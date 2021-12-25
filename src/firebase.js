// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore,} from 'firebase/firestore';
import { getAuth,  } from 'firebase/auth';
import { GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIaK5fAxfAZK8Frlnbv6GoRWiIbIi3l-c",
  authDomain: "whatasppwebui-clone.firebaseapp.com",
  projectId: "whatasppwebui-clone",
  storageBucket: "whatasppwebui-clone.appspot.com",
  messagingSenderId: "1070185060315",
  appId: "1:1070185060315:web:0f20a4bfc2ff6231e9b9fe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth  =getAuth(app);

export {auth,provider};
export default getFirestore();
