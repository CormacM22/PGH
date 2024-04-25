import React from 'react';
import { Link } from 'react-router-dom';
import "./LogInOptions.css";

const RegisterOptions = () => {
  return (
    <div>
      <div className="header">
        <div className="header-left"></div> 
        <h1 className="site-title">Pro Guidance Hub</h1>
        <div className="header-right">
          <Link to="/home" className="menu-link header-link">Home</Link> 
        </div>
      </div>

    <div className="choose-role-container">
      <h1>Welcome to Our Service</h1>
      <p>Select your role to Register:</p>
      <div className="role-buttons">
        <Link to="/coachsignup">
          <button className="btn">Coach Register</button>
        </Link>
        <Link to="/clientsignup">
          <button className="btn">Client Register</button>
        </Link>
      </div>
    </div>
    </div>
  );
};

export default RegisterOptions;
