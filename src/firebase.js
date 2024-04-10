import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signOut as firebaseSignOut } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDO-h29bR0cuEwZ-OPQWurrLAbYJH6jIUc",
  authDomain: "proguidancehub-e0861.firebaseapp.com",
  projectId: "proguidancehub-e0861",
  storageBucket: "proguidancehub-e0861.appspot.com",
  messagingSenderId: "1024022757204",
  appId: "1:1024022757204:web:7a0a8370f61674667ad2c1"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const firestore = getFirestore(firebase);
const auth = getAuth(firebase);

const signOut = async () => {
  await firebaseSignOut(auth);
};

export { firebase, firestore, auth, signOut };