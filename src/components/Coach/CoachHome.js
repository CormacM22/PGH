import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase'; // Import Firebase authentication services
import { Link, useNavigate } from 'react-router-dom'; // Import routing capabilities
import { signOut } from '../../firebase'; // Import signOut function from Firebase
import './CoachHome.css'; 

const CoachHome = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate between routes
  const [userFirstName, setUserFirstName] = useState(''); // State for storing user's first name

  useEffect(() => {
    const currentUser = auth.currentUser; // Get the currently authenticated user
    if (currentUser) {
      // If a user is logged in
      const email = currentUser.email; // Extract email from user details
      const firstName = email.substring(0, email.indexOf('@')); // Parse the first name from the email
      const capitalizedFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1); // Capitalize the first name
      setUserFirstName(capitalizedFirstName); // Set the user's first name in the state
    } else {
      // If no user is logged in, navigate to the CoachSignIn page
      navigate('/ClientSignIn');
    }
  }, [navigate]); // Depend on navigate for effect re-calculation if it changes

  const handleSignOut = async () => {
    // Function to handle user sign out
    try {
      await signOut(); // Use Firebase signOut method to log out
      navigate('/ClientSignIn'); // Redirect to the sign-in page after sign out
    } catch (error) {
      console.error('Sign out error:', error.message); // Log any errors during sign out
    }
  };

  return (
    <div className="client-home-container">
      <div className="navbar" style={{ background: 'none', boxShadow: 'none', display: 'flex', justifyContent: 'space-between' }}>
        <div className="header-left"></div> 
        <h1 className="site-title">Pro Guidance Hub</h1> 
        <div className="header-right">
          <Link to="/home" className="menu-link">Sign Out</Link> 
        </div>
      </div>
      <div className="content">
        {userFirstName && ( // Conditional rendering based on the availability of userFirstName
          <>
            <h1>Welcome back Coach, {userFirstName}!</h1> 
            <p>Check in on your client!</p>
            <div className="action-buttons">
              <Link to="/coachmessaging" className="action-button">Message Client</Link> 
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CoachHome; 
