import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import "./CoachSignUp.css"; 

const CoachSignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const auth = getAuth();

    const db = getFirestore();

    const signUp = async (e) => {
        e.preventDefault();
        const auth = getAuth();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log("User registered:", userCredential.user);

            // Queue email for sending
            await addEmailToSend(email);

            // Redirect to the client home page after successful sign-up
            navigate('/coachhome');
        } catch (error) {
            console.error('Sign up error:', error.message);
        }
    };

    // Function to queue email for sending
    const addEmailToSend = async (recipientEmail) => {
        const emailsCollection = collection(db, 'mail'); // 'mail' is the default collection name used by the extension
        try {
            await addDoc(emailsCollection, {
                to: recipientEmail, // recipient's email address
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
            <p className="home-link">Back to Home? <Link to="/">Home</Link></p>
        </div>
    );
};

export default CoachSignUp;
