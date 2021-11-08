// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDP9rrga15WM8MvIy13-uDf8VzfgfsbD-Q",
  authDomain: "kitamachihutte.firebaseapp.com",
  databaseURL: "https://kitamachihutte.firebaseio.com",
  projectId: "kitamachihutte",
  storageBucket: "kitamachihutte.appspot.com",
  messagingSenderId: "1037499887793",
  appId: "1:1037499887793:web:6a5b56ba46c8aceab13290"
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();