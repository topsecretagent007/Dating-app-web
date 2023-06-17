import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyCMxM2c7LdH99tbcxJ_-jTNqSQJJkp4PIc",
  authDomain: "react-firebase-60cd7.firebaseapp.com",
  projectId: "react-firebase-60cd7",
  storageBucket: "react-firebase-60cd7.appspot.com",
  messagingSenderId: "692198393311",
  appId: "1:692198393311:web:f087412be171c366d2306a",
  measurementId: "G-JKVG3PMWC2"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//firebase methods  
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
export const db = firebase.firestore()