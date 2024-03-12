// SignInOptions.js
import React from 'react';
import { Link } from 'react-router-dom';
import './SignInOptions.css'; // Import your custom styles

const SignInOptions = () => {
  return (
    <div className="signin-options-container">
      <h1>Welcome! Choose an option:</h1>
      <div className="signin-option">
        <Link to="/ClientSignIn">
          <button className="client-signin-btn">Sign In as a Client</button>
        </Link>
      </div>
      <div className="signin-option">
        <Link to="/CoachSignIn">
          <button className="coach-signin-btn">Sign In as a Coach</button>
        </Link>
      </div>
    </div>
  );
};

export default SignInOptions;
