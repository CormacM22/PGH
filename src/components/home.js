// Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './home.css'; 

const Home = () => {
  return (
    <div>
      <nav className="navbar">
        <Link to="/home" className="logo">Pro Guidance Hub</Link>
        <div className="nav-links">
          <Link to="/SignInOptions" className="nav-link">Sign In</Link>
        </div>
      </nav>
      <div className="content">
        {/* Your home page content goes here */}
        <h1>Welcome to Your Home Page</h1>
      </div>
    </div>
  );
};

export default Home;
