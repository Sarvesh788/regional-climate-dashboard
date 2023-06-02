import React from 'react';
import './Sidebar.css';

const Sidebar = ({ handleDataOption, isDarkMode }) => {
  return (
    <div className={`sidebar ${isDarkMode ? 'sidebar-dark' : ''}`}>
      <h2>Data Options</h2>
      <button onClick={() => handleDataOption('temperature')}>Temperature</button>
      <button onClick={() => handleDataOption('clouds')}>Clouds</button>
      <button onClick={() => handleDataOption('rainfall')}>Rainfall</button>
      <button onClick={() => handleDataOption('humidity')}>Humidity</button>
      <button onClick={() => handleDataOption('windSpeed')}>Wind Speed</button>
      <button onClick={() => handleDataOption('globalPrecipitation')}>Global Precipitation</button>
    </div>
  );
};

export default Sidebar;
