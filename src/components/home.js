import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import for navigation links
import './home.css'; 

const Home = () => {
  // State to manage which feature is currently active (hovered over)
  const [activeFeature, setActiveFeature] = useState('');

  // Object containing details about features offered
  const features = {
    'exercise-tutorials': {
      title: 'Exercise Tutorials',
      description: 'Access a variety of instructional videos and guidelines to perfect your technique and enhance your fitness regimen.',
      icon: 'fas fa-dumbbell fa-3x' // Font Awesome icon class for visuals
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

  return (
    <div className="home-container">
      <div className="header">
        <div className="header-left"> 
        </div>
        <h1 className="site-title">Pro Guidance Hub</h1> {/* Main title of the site */}
        <div className="header-right">
          <Link to="/LogInOptions" className="menu-link">Log In</Link> {/* Navigation link to Log In page */}
          <Link to="/RegisterOptions" className="menu-link">Register</Link> {/* Navigation link to Register page */}
        </div>
      </div>

      <div className="intro-section">
        <h1>Track, Progress, Achieve</h1> 
        <p>Welcome to Pro Guidance Hub - your ultimate companion on your fitness journey.</p> {/* Introductory text */}
        <div className="feature-list">
          {Object.keys(features).map((feature) => ( // Iterate over each feature in the features object
            <div 
              className={`feature-item ${activeFeature === feature ? 'active' : ''} ${activeFeature && activeFeature !== feature ? 'fade' : ''}`}
              onMouseEnter={() => setActiveFeature(feature)} // Set active feature on mouse enter
              onMouseLeave={() => setActiveFeature('')} // Remove active feature on mouse leave
            >
              <h2>{features[feature].title}</h2> {/* Display the title of the feature */}
              <p>{features[feature].description}</p> {/* Display the description of the feature */}
              <i className={features[feature].icon}></i> {/* Display an icon associated with the feature */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home; // Export the component for use in other parts of the application
