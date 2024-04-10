import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from '../../firebase'; 
import './ClientHome.css'; 

const ClientHome = () => {
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
      // If no user is found, navigate to the ClientSignIn page
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
              <Link to="/exercise-tutorials" className="action-button">Exercise Tutorials</Link>
              <Link to="/log-workout" className="action-button">Log Workout</Link>
              <Link to="/log-calories" className="action-button">Log Calories</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ClientHome;
