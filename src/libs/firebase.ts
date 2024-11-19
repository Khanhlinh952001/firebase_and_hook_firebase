// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";const firebaseConfig = {
  apiKey: "AIzaSyDVIkEmlB4GqMxzrpNdfUEnPjb2Qw3FQfw",
  authDomain: "profile-c06a6.firebaseapp.com",
  databaseURL: "https://profile-c06a6-default-rtdb.firebaseio.com",
  projectId: "profile-c06a6",
  storageBucket: "profile-c06a6.appspot.com",
  messagingSenderId: "560616870200",
  appId: "1:560616870200:web:d3b1b10406cf46327831cd",
  measurementId: "G-QLM04WYVYP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)

