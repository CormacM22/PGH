import React, { useState } from "react";
import { auth } from "../../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import "./ClientSignUp.css"; // Import your custom styles

const ClientSignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const signUp = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log(userCredential);

            // Redirect to the Sign In page after successful sign-up
            navigate('/signin');
        } catch (error) {
            console.error('Sign up error:', error.message);
        }
    };

    return (
        <div className='sign-up-container'>
            <form onSubmit={signUp} className="sign-up-form">
                <h1>Client</h1>
                <h1>Create An Account</h1>
                <input
                    type="email"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field"
                ></input>
                <input
                    type="password"
                    placeholder="Enter Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field"
                ></input>
                <button type="submit" className="submit-button">Sign Up</button>
            </form>

            {/* Add a link to navigate to the Sign In page */}
            <p className="signin-link">Already have an account? <Link to="/ClientSignin">Sign In</Link></p>
            <p className="coachsignup-link">Sign up as a Coach? <Link to="/CoachSignUp">Sign Up</Link></p>

            {/* Add a link to navigate to the Home page */}
            <p className="home-link">Back to Home? <Link to="/">Home</Link></p>
        </div>
    )
}

export default ClientSignUp;
