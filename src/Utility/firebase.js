// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
//for Authertication purpose
import { getAuth } from "firebase/auth";
import "firebase/compat/firestore"
import "firebase/compat/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2cNbSskVO1H2K8Nnez8DJAHRD9dOnzxk",
  authDomain: "clone-5c16b.firebaseapp.com",
  projectId: "clone-5c16b",
  storageBucket: "clone-5c16b.appspot.com",
  messagingSenderId: "198508539106",
  appId: "1:198508539106:web:de16d029b47882a338c2bb"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = app.firestore()