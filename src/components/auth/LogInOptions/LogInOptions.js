import React from 'react';
import { Link } from 'react-router-dom';
import "./LogInOptions.css";

const LogInOptions = () => {
  return (
    <div className="choose-role-container">
      <h1>Welcome to Our Service</h1>
      <p>Select your role to sign in:</p>
      <div className="role-buttons">
        <Link to="/coachsignin">
          <button className="btn">Coach Sign In</button>
        </Link>
        <Link to="/clientsignin">
          <button className="btn">Client Sign In</button>
        </Link>
      </div>
    </div>
  );
};

export default LogInOptions;
