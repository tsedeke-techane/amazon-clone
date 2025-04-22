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
  apiKey: "AIzaSyCOWJg4eQpE1hYJaGYr0yZ_LBdMXel3i8Q",
  authDomain: "clone-2b5b0.firebaseapp.com",
  projectId: "clone-2b5b0",
  storageBucket: "clone-2b5b0.firebasestorage.app",
  messagingSenderId: "1055958540900",
  appId: "1:1055958540900:web:c29721a1beead15b6bb571"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = app.firestore()