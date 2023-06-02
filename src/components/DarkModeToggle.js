import React from 'react';

const DarkModeToggle = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <div className="dark-mode-toggle">
      <label className="switch">
        <input type="checkbox" checked={isDarkMode} onChange={toggleDarkMode} />
        <span className="slider round"></span>
      </label>
      <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
    </div>
  );
};

export default DarkModeToggle;
