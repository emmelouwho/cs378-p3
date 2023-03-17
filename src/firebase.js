// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDi1mxYyR4YXBIYErX11kvGQzg6q5LX9mc",
  authDomain: "test-3771e.firebaseapp.com",
  databaseURL: "https://test-3771e-default-rtdb.firebaseio.com",
  projectId: "test-3771e",
  storageBucket: "test-3771e.appspot.com",
  messagingSenderId: "1009154028248",
  appId: "1:1009154028248:web:501457ae4727449e665dad",
  measurementId: "G-SXJXQCKTG8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getDatabase(app);