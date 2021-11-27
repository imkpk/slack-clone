import { firebase } from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQw7Io_0Im0EVcLnLBToIuTgRhqTRb9iY",
  authDomain: "slack-clone-kpk.firebaseapp.com",
  projectId: "slack-clone-kpk",
  storageBucket: "slack-clone-kpk.appspot.com",
  messagingSenderId: "1091098167954",
  appId: "1:1091098167954:web:d15eeb802f114875c1f44b",
  measurementId: "G-RJLY1TV038",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default firebase;
