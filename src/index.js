import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

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

function writeUserData(userId, name, email, imageUrl) {
  const db = getDatabase();
  const reference = ref(db, 'users/' + userId);

  set(reference, {
    username: name,
    email: email,
    profile_picture: imageUrl
  });
}

writeUserData("cormac", "cor", "myemail@me.com", "myimageurl")



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
