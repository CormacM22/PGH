import React, { useState } from "react";
import { auth } from "../../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import "./CoachSignIn.css" 

const CoachSignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        // Redirect to the home page after successful login
        navigate('/CoachHome');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className='sign-in-container'>
      <form onSubmit={signIn} className="sign-in-form">
        <h1>Coach</h1>
        <h1>Log In To Your Account</h1>
        <input
          type="email"
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
        ></input>
        <input
          type="password"
          placeholder="Enter Your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        ></input>
        <button type="submit" className="submit-button">Log In</button>
      </form>

      {/* Add a button to navigate to the Sign Up page */}
      <p className="signup-link">Don't have an account? <Link to="/CoachSignup">Sign Up</Link></p>
      {/* Add a link to navigate to the Home page */}
      <p className="home-link">Back to Home? <Link to="/">Home</Link></p>
    </div>
  );
}

export default CoachSignIn;
