// Home.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from '../../firebase'; // Import your signOut function
import './ClientHome.css'; // Import your custom styles

const Home = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/'); // Redirect to the sign-in page after signing out
    } catch (error) {
      console.error('Sign out error:', error.message);
    }
  };

  return (
    <div>
      <nav className="navbar">
        <Link to="/home" className="logo">Pro Guidance Hub</Link>
        <div className="nav-links">
          <button onClick={handleSignOut}>Sign Out</button>
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
