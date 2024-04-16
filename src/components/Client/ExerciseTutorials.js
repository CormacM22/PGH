// ExerciseTutorials.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ExerciseTutorials.css'; // Ensure to create this CSS file for styling

const ExerciseTutorials = () => {
  const [tutorials, setTutorials] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: 'GET',
        url: 'https://gym-fit.p.rapidapi.com/exercises/exercise/41aeff91-79d7-4d73-883d-f61d117dc0d8',
        headers: {
          'X-RapidAPI-Key': 'd9a5be4a4dmshf9b267737f0dd4ep12f5b6jsn80bbe9eade68',
          'X-RapidAPI-Host': 'gym-fit.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        setTutorials(response.data); // Assuming the data is in the format we can directly use
      } catch (error) {
        console.error('Error fetching exercise tutorials:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="exercise-tutorials-container">
      <nav className="navbar">
        <Link to="/clienthome" className="logo">Pro Guidance Hub</Link>
        {/* Include other navigation links as needed */}
      </nav>
      <div className="content">
        <h1>Exercise Tutorials</h1>
        {tutorials.length > 0 ? (
          <ul>
            {tutorials.map((tutorial, index) => (
              // Adjust according to the structure of the tutorial data you receive
              <li key={index}>{tutorial.name}</li> // This is a placeholder. Customize it as needed.
            ))}
          </ul>
        ) : (
          <p>No tutorials found.</p>
        )}
      </div>
    </div>
  );
};

export default ExerciseTutorials;
