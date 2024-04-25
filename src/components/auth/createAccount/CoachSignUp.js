import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import "./CoachSignUp.css";

// Functional component for Coach Sign-Up
const CoachSignUp = () => {
    // State for managing email and password inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // Hook for navigating programmatically
    const navigate = useNavigate();

    // Firebase authentication and Firestore database instances
    const auth = getAuth();
    const db = getFirestore();

    // Handle form submission for sign-up
    const signUp = async (e) => {
        e.preventDefault();
        try {
            // Register user with email and password
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log("User registered:", userCredential.user);

            // Function call to send a welcome email
            await addEmailToSend(email);

            // Navigate to the coach home page upon successful sign-up
            navigate('/coachhome');
        } catch (error) {
            console.error('Sign up error:', error.message);
        }
    };

    // Function to add email to Firestore for sending a welcome message
    const addEmailToSend = async (recipientEmail) => {
        const emailsCollection = collection(db, 'mail');
        try {
            await addDoc(emailsCollection, {
                to: recipientEmail,
                message: {
                    subject: 'Welcome to Pro Guidance Hub!',
                    html: '<p>Welcome to our platform! We are excited to have you on board.</p>',
                },
            });
            console.log("Email queued for sending!");
        } catch (error) {
            console.error("Error queuing email:", error);
        }
    };

    // Component rendering the sign-up form
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

            <p className="signin-link">Already have an account? <Link to="/CoachSignin">Sign In</Link></p>
            <p className="home-link">Back to Home? <Link to="/home">Home</Link></p>
        </div>
    );
};

export default CoachSignUp;
