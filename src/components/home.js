import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import Image0 from './images/Image0.jpeg';

const Home = () => {
  return (
    <div className="home-container">
      <nav className="navbar">
        <Link to="/" className="logo">Pro Guidance Hub</Link>
        <div className="nav-links">
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/clientSignUp" className="nav-link">Sign Up</Link>
          <Link to="/clientSignIn" className="nav-link">Login</Link>
        </div>
      </nav>
      <div className="image-container">
        <img src={Image0} alt="Fitness Tracker" style={{width: "100%", display: "block"}} />
      </div>
      <div className="intro-section">
        <h1>Track, Progress, Achieve</h1>
        <p>Welcome to Pro Guidance Hub - your ultimate companion on your fitness journey. Our app helps you monitor your workouts, track your progress, and stay motivated towards achieving your health and fitness goals.</p>
        <p>By creating an account, you'll gain access to personalized workout plans, progress tracking, nutrition guidance, and a supportive community to keep you inspired.</p>
        <div className="action-buttons">
          <Link to="/clientsignup" className="cta-button">Get Started</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
