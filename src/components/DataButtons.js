import React from 'react';
import './DataButtons.css';

const DataButtons = ({ isDarkMode, handleDataOption }) => {
  return (
    <div className={`data-buttons ${isDarkMode ? 'dark-mode' : ''}`}>
      <button onClick={() => handleDataOption('temperature')}>Temperature</button>
      <button onClick={() => handleDataOption('rainfall')}>Rainfall</button>
      <button onClick={() => handleDataOption('humidity')}>Humidity</button>
      <button onClick={() => handleDataOption('pressure')}>Pressure</button>
    </div>
  );
};

export default DataButtons;
