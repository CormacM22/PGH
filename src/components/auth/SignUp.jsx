import React, { useState } from "react";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Import useNavigate here

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
        <div className='sign-in-container'>
            <form onSubmit={signUp}>
                <h1>Create An Account</h1>
                <input
                    type="email"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></input>
                <input
                    type="password"
                    placeholder="Enter Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></input>
                <button type="submit">Sign Up</button>
            </form>

            {/* Add a link to navigate to the Sign In page */}
            <p>Already have an account? <Link to="/signin">Sign In</Link></p>
        </div>
    )
}

export default SignUp;
