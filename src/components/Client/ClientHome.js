import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from '../../firebase'; 
import './ClientHome.css'; 

const ClientHome = () => {
  const navigate = useNavigate();
  const [userFirstName, setUserFirstName] = useState('');

  useEffect(() => {
    // Get the currently authenticated user
    const currentUser = auth.currentUser;

    // Check if a user is authenticated
    if (currentUser) {
      // Extract the first part of the email (before the @ symbol)
      const email = currentUser.email;
      const firstName = email.substring(0, email.indexOf('@'));
      
      // Capitalize the first letter of the first name
      const capitalizedFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
      
      setUserFirstName(capitalizedFirstName);
    }
  }, []);

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

        <h1>Welcome to The Client Home Page</h1>
        {userFirstName && <p>Hello, {userFirstName}!</p>}
      </div>
    </div>
  );
};

export default ClientHome;
