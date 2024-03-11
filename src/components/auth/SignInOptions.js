// SignInOptions.js
import React from 'react';
import { Link } from 'react-router-dom';

const SignInOptions = () => {
  return (
    <div>
      <h1>Welcome! Choose an option:</h1>
      <div>
        <Link to="./ClientSignIn">
          <button>Sign In as a Client</button>
        </Link>
      </div>
      <div>
        <Link to="./CoachSignIn">
          <button>Sign In as a Coach</button>
        </Link>
      </div>
    </div>
  );
};

export default SignInOptions;
