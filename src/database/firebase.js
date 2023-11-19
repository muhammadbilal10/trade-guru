// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0bK5e9amG4Azy0U73HXxf4KyzKKGXB24",
  authDomain: "fyp-project-58f9c.firebaseapp.com",
  projectId: "fyp-project-58f9c",
  storageBucket: "fyp-project-58f9c.appspot.com",
  messagingSenderId: "836963463084",
  appId: "1:836963463084:web:02700073cdc3c3dbddd409",
  measurementId: "G-LQ7KY3M3FC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);