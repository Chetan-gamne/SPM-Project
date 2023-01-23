// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrLKaT4OdBLsLXEr0VSkW6ZpWj4DCnF4U",
  authDomain: "spmdemo-dcf07.firebaseapp.com",
  projectId: "spmdemo-dcf07",
  storageBucket: "spmdemo-dcf07.appspot.com",
  messagingSenderId: "749325507904",
  appId: "1:749325507904:web:fa0bb0da4f29635c8c6ea5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
