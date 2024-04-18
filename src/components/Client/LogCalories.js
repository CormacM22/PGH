import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LogCalories = () => {
  const [caloriesData, setCaloriesData] = useState(null); // State to store the fetched data

  useEffect(() => {
    const fetchCalories = async () => {
      const options = {
        method: 'GET',
        url: 'https://fitness-calculator.p.rapidapi.com/dailycalorie',
        params: {
          age: '25',
          gender: 'male',
          height: '180',
          weight: '70',
          activitylevel: 'level_1'
        },
        headers: {
          'X-RapidAPI-Key': 'd9a5be4a4dmshf9b267737f0dd4ep12f5b6jsn80bbe9eade68',
          'X-RapidAPI-Host': 'fitness-calculator.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        setCaloriesData(response.data); // Store the fetched data in state
      } catch (error) {
        console.error(error);
        // Handle errors, such as displaying an error message to the user
      }
    };

    fetchCalories(); // Call the function when the component mounts
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <div>
      <h2>Calories Data</h2>
      {caloriesData ? ( // Check if data is available before rendering
        <div>
          <p>Age: {caloriesData.age}</p>
          <p>Gender: {caloriesData.gender}</p>
          <p>Height: {caloriesData.height}</p>
          <p>Weight: {caloriesData.weight}</p>
          {/* Render other properties as needed */}
        </div>
      ) : (
        <p>Loading...</p> // Display a loading message while fetching data
      )}
    </div>
  );
};

export default LogCalories;
