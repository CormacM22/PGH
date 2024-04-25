import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase'; // Import authentication service
import { Link, useNavigate } from 'react-router-dom'; // Import routing capabilities
import { signOut } from '../../firebase'; // Import sign-out functionality
import './ClientHome.css'; // Import CSS for styling

const ClientHome = () => {
  const navigate = useNavigate(); // Hook for programmatically navigating
  const [userFirstName, setUserFirstName] = useState(''); // State to store the user's first name

  // useEffect to handle user authentication status and extract first name
  useEffect(() => {
    const currentUser = auth.currentUser; // Access current user from Firebase auth
    if (currentUser) {
      // If user is logged in, extract and format user's first name from email
      const email = currentUser.email;
      const firstName = email.substring(0, email.indexOf('@')); // Extract substring before '@'
      const capitalizedFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1); // Capitalize the first letter
      setUserFirstName(capitalizedFirstName); // Set the formatted name to state
    } else {
      // If no user is logged in, redirect to the sign-in page
      navigate('/ClientSignIn');
    }
  }, [navigate]); // Depend on navigate to re-run effect if it changes

  // Function to handle user sign-out
  const handleSignOut = async () => {
    try {
      await signOut(); // Call sign-out function from Firebase
      navigate('/Home'); // Navigate to home page after sign-out
    } catch (error) {
      console.error('Sign out error:', error.message); // Log any sign-out errors
    }
  };

  return (
    <div className="home-container">
      <div className="header">
        <div className="header-left"></div> 
        <h1 className="site-title">Pro Guidance Hub</h1> 
        <div className="header-right">
          <button className="menu-link sign-out-button" onClick={handleSignOut}>Sign Out</button> 
        </div>
      </div>
      <div className="content">
        {userFirstName && ( // Conditional rendering based on user's first name availability
          <>
            <h1>Welcome back, {userFirstName}!</h1> 
            <p>Ready to take the next step in your fitness journey? Let's go!</p>
            <div className="action-buttons">
              <Link to="/ExerciseTutorials" className="action-button"><i className="fas fa-dumbbell"></i> Exercise Tutorials</Link> 
              <Link to="/clientmessaging" className="action-button"><i className="fas fa-comments"></i> Message Coach</Link> 
              <Link to="/chatbot" className="action-button"><i className="fas fa-robot"></i> Chat Bot</Link> 
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ClientHome; 
