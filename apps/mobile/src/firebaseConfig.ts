// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDU9crRCsbM_OQH1LcEyA-oa9IMMUvFrrM",
  authDomain: "spm-project-unofficial.firebaseapp.com",
  projectId: "spm-project-unofficial",
  storageBucket: "spm-project-unofficial.appspot.com",
  messagingSenderId: "839258501940",
  appId: "1:839258501940:web:5df36b3e787ee0b9026b61",
  measurementId: "G-PZQDQ3Y8KC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
