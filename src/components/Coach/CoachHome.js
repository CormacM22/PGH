import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from '../../firebase'; 
import './CoachHome.css'; 

const CoachHome = () => {
  const navigate = useNavigate();
  const [userFirstName, setUserFirstName] = useState('');

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const email = currentUser.email;
      const firstName = email.substring(0, email.indexOf('@'));
      const capitalizedFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
      setUserFirstName(capitalizedFirstName);
    } else {
      // If no user is found, navigate to the CoachSignIn page
      navigate('/ClientSignIn');
    }
  }, [navigate]);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/ClientSignIn'); 
    } catch (error) {
      console.error('Sign out error:', error.message);
    }
  };

  return (
    <div className="client-home-container">
      <nav className="navbar">
        <Link to="/clienthome" className="logo">Pro Guidance Hub</Link>
        <div className="nav-links">
          <button className="sign-out-button" onClick={handleSignOut}>Sign Out</button>
        </div>
      </nav>
      <div className="content">
        {userFirstName && (
          <>
            <h1>Welcome back, {userFirstName}!</h1>
            <p>Ready to take the next step in your fitness journey? Explore the resources available to you:</p>
            <div className="action-buttons">
              <Link to="/coachmessaging" className="action-button">Message Coach</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CoachHome;
