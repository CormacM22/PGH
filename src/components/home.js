import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './home.css';

const Home = () => {
  const [activeFeature, setActiveFeature] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const features = {
    'exercise-tutorials': {
      title: 'Exercise Tutorials',
      description: 'Access a variety of instructional videos and guidelines to perfect your technique and enhance your fitness regimen.',
      icon: 'fas fa-dumbbell fa-3x'
    },
    'log-workout': {
      title: 'Log Workout',
      description: 'Track your workouts easily, logging exercises, durations, and intensities to monitor your progress over time.',
      icon: 'fas fa-running fa-3x'
    },
    'log-calories': {
      title: 'Log Calories',
      description: 'Maintain a daily dietary log to manage and track your caloric intake for balanced nutrition.',
      icon: 'fas fa-utensils fa-3x'
    },
    'message-coach': {
      title: 'Message Your Coach',
      description: 'Directly communicate with your fitness coach to get personalized advice and answers to your queries.',
      icon: 'fas fa-comments fa-3x'
    },
    'chat-bot': {
      title: 'Chat Bot',
      description: 'Interact with our intelligent chatbot designed for quick answers to your fitness and health questions.',
      icon: 'fas fa-robot fa-3x'
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="home-container">
      <div className="header">
        <h1 className="site-title">Pro Guidance Hub</h1>
        <div className="menu-icon" onClick={toggleMenu}>
          <i className="fas fa-bars"></i> 
        </div>
        {menuOpen && (
          <div className="dropdown-menu">
            <Link to="/LogInOptions" className="menu-link">Get Started</Link>
            <Link to="/About" className="menu-link">About</Link>
            
          </div>
        )}
      </div>

      <div className="intro-section">
        <h1>Track, Progress, Achieve</h1>
        <p>Welcome to Pro Guidance Hub - your ultimate companion on your fitness journey.</p>
        <div className="feature-list">
          {Object.keys(features).map((feature) => (
            <div className={`feature-item ${activeFeature === feature ? 'active' : ''} ${activeFeature && activeFeature !== feature ? 'fade' : ''}`}
                 onClick={() => setActiveFeature(feature === activeFeature ? '' : feature)}>
              <h2>{features[feature].title}</h2>
              <p>{features[feature].description}</p>
              <i className={features[feature].icon}></i>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
