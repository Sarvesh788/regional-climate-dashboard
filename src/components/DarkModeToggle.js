import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import './DarkModeToggle.css';

// const DarkModeToggle = ({ isDarkMode, toggleDarkMode }) => {
//   return (
//     <div className="dark-mode-toggle">
//       <label className="switch">
//         <input type="checkbox" checked={isDarkMode} onChange={toggleDarkMode} />
//         <span className="slider round"></span>
//       </label>
//       <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
//     </div>
//   );
// };

// const DarkModeToggle = ({ isDarkMode, toggleDarkMode }) => {
//   return (
//     <button className="dark-mode-toggle" onClick={toggleDarkMode}>
//       <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
//     </button>
//   );
// };

// export default DarkModeToggle;

// format 2: 

const DarkModeToggle = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <div className={`dark-mode-toggle ${isDarkMode ? 'dark-mode' : ''}`} onClick={toggleDarkMode}>
      <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
    </div>
  );
};

// export default DarkModeSwitch;


export default DarkModeToggle;