import React, { useEffect, useState } from "react";
import { auth } from "../firebase"; // Importing Firebase authentication instance
import { onAuthStateChanged, signOut } from "firebase/auth"; // Import specific Firebase auth functions

const AuthDetails = () => {
    // State for storing the authenticated user object
    const [authUser, setAuthUser] = useState(null);

    // useEffect hook to monitor authentication state changes
    useEffect(() => {
        // Set up a listener for changes in authentication state
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                // If a user is found (signed in), update the state with the user object
                setAuthUser(user);
            } else {
                // If no user is found (signed out), set the state to null
                setAuthUser(null);
            }
        });

        // Cleanup function to unsubscribe from the listener when the component unmounts
        return () => {
            listen();
        };
    }, []); // Empty dependency array ensures this effect runs only once after initial render

    // Function to handle user sign out
    const userSignOut = () => {
        signOut(auth).then(() => {
            // Log to console on successful sign out
            console.log('sign out successful');
        }).catch(error => {
            // Log to console if there is an error during the sign out
            console.log(error);
        });
    }

    // Render component based on the authentication state
    return (
        <div>
          {authUser ? (
            // Conditionally render user details and sign out button if user is signed in
            <>
              <p>{`Signed In as ${authUser.email}`}</p> 
              <button onClick={userSignOut}>Sign Out</button> 
            </>
          ) : (
            // Display this paragraph if no user is signed in
            <p>Signed Out</p>
          )}
        </div>
      );
}

export default AuthDetails; 
