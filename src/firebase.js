// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqruWj4mgSMYQJwy4r-GpTadSTcSsz0ME",
  authDomain: "proguidancehub-bf3d9.firebaseapp.com",
  databaseURL: "https://proguidancehub-bf3d9-default-rtdb.firebaseio.com",
  projectId: "proguidancehub-bf3d9",
  storageBucket: "proguidancehub-bf3d9.appspot.com",
  messagingSenderId: "32108389951",
  appId: "1:32108389951:web:d74d683345c5c9c3937a8a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
