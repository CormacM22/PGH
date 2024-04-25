import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ExerciseTutorials.css';

const ExerciseTutorials = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (searchQuery.trim()) {
      setLoading(true);
      const fetchData = async () => {
        try {
          const response = await axios.get('https://gym-fit.p.rapidapi.com/exercises/search', {
            headers: {
              'X-RapidAPI-Key': 'd9a5be4a4dmshf9b267737f0dd4ep12f5b6jsn80bbe9eade68',
              'X-RapidAPI-Host': 'gym-fit.p.rapidapi.com'
            },
            params: { query: searchQuery }
          });
          setSearchResults(response.data);
        } catch (error) {
          console.error('Error fetching exercise tutorials:', error);
        }
      };
      fetchData();
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setSelectedExercise(null);
  };

  const selectExercise = async (exerciseId) => {
    const options = {
      method: 'GET',
      url: `https://gym-fit.p.rapidapi.com/exercises/exercise/${exerciseId}`,
      headers: {
        'X-RapidAPI-Key': 'd9a5be4a4dmshf9b267737f0dd4ep12f5b6jsn80bbe9eade68',
        'X-RapidAPI-Host': 'gym-fit.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      setSelectedExercise(response.data);
      setError('');
    } catch (error) {
      setError('Failed to fetch exercise details. Please try again.');
      setSelectedExercise(null);
    } finally {
      setLoading(false);
    }
  };

  // Render a list of objects with id and name properties
  const renderObjectList = (list) => (
    <ul>
      {list.map((item, index) => <li key={item.id || index}>{item.name}</li>)}
    </ul>
  );

  // Render instructions which are objects with description and order
  const renderInstructions = (instructions) => (
    <ol>
      {instructions.map((instruction, index) => (
        <li key={index}>{instruction.description}</li>
      ))}
    </ol>
  );

  return (
    <div className="exercise-tutorials-container">
      <div className="navbar" style={{ background: 'none', boxShadow: 'none', display: 'flex', justifyContent: 'space-between' }}>
        <div className="header-left"></div>
        <h1 className="site-title">Pro Guidance Hub</h1>
        <div className="header-right">
          <Link to="/clienthome" className="menu-link">Home</Link>
        </div>
      </div>
      <div className="content">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search exercises..."
            value={searchQuery}
            onChange={handleSearch}
            className="search-input"
          />
        </div>
        {loading && <div>Loading...</div>}
        {error && <div className="error">{error}</div>}
        <div>
          <h3>Available Exercises</h3>
          <ul>
            {searchResults.map((exercise, index) => (
              <li key={exercise.id || index} onClick={() => selectExercise(exercise.id)} className="list-item">
                {exercise.name}
              </li>
            ))}
          </ul>
        </div>
        {selectedExercise && (
          <div className="exercise-details">
            <h2>Exercise Details</h2>
            <p><strong>Name:</strong> {selectedExercise.name}</p>
            <div><strong>Variations:</strong> {renderObjectList(selectedExercise.variations)}</div>
            <div><strong>Instructions:</strong> {renderInstructions(selectedExercise.instructions)}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExerciseTutorials;
