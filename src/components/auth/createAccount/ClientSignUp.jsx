import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import "./ClientSignUp.css"; 

// Main functional component for client sign-up
const ClientSignUp = () => {
    // State hooks for managing email and password input
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // Hook for programmatic navigation
    const navigate = useNavigate();

    // Firebase authentication instance
    const auth = getAuth();

    // Firestore database instance
    const db = getFirestore();

    // Sign-up function which is called on form submission
    const signUp = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        try {
            // Create user with email and password, returns user credentials
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log("User registered:", userCredential.user);

            // Function to send a welcome email after successful sign-up
            await addEmailToSend(email);

            // Navigate to the client home page upon successful registration
            navigate('/clienthome');
        } catch (error) {
            // Log any errors during sign-up
            console.error('Sign up error:', error.message);
        }
    };

    // Async function to add an email to the queue for sending
    const addEmailToSend = async (recipientEmail) => {
        const emailsCollection = collection(db, 'mail'); // Access the 'mail' collection in Firestore
        try {
            // Add document to Firestore collection
            await addDoc(emailsCollection, {
                to: recipientEmail, // recipient's email address
                message: {
                    subject: 'Welcome to Pro Guidance Hub!',
                    html: '<p>Welcome to our platform! We are excited to have you on board.</p>',
                },
            });
            console.log("Email queued for sending!");
        } catch (error) {
            // Log any errors in queuing the email
            console.error("Error queuing email:", error);
        }
    };

    // Component rendering a form for sign-up
    return (
        <div className='sign-up-container'>
            <form onSubmit={signUp} className="sign-up-form">
                <h1>Create An Account</h1>
                <input
                    type="email"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="input-field"
                />
                <input
                    type="password"
                    placeholder="Enter Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="input-field"
                />
                <button type="submit" className="submit-button">Sign Up</button>
            </form>

            <p className="signin-link">Already have an account? <Link to="/ClientSignin">Sign In</Link></p>
            <p className="home-link">Back to Home? <Link to="/home">Home</Link></p>
        </div>
    );
};

export default ClientSignUp;
