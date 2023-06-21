import React, { useState } from 'react';
import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import DataButtons from './DataButtons';
import './Sidebar.css';

const SidePart = ({ handleDataOption, isDarkMode, isExpanded, onMenuClick}) => {
  const [isWidened, setIsExpanded] = useState(false);
  // const [sidebarPosition, setSidebarPosition] = useState(0);

  const handleMenuClick = () => {
    if(onMenuClick){
      onMenuClick();  
    }
    // setSideb  arPosition(sidebarPosition === 0 ? -200 : 0);
  };
  // return (
  //   <> 
     {/* <div className={`sidebar ${isDarkMode ? 'dark-mode' : ''} ${isExpanded ? 'open' : ''}`}> */}
    return (
   <div className={`sidebar ${isWidened ? 'open' : ''} ${isDarkMode ? 'dark-mode' : ''}${isExpanded ? 'open' : ''}`}>
      <DataButtons isDarkMode={isDarkMode} handleDataOption={handleDataOption} />
       <button className="toggle-button" onClick={() => setIsExpanded(!isWidened)}>
        <FontAwesomeIcon icon={faBars} />
      </button> 
      <div className={`sidebar ${isDarkMode ? 'dark-mode' : ''} ${isWidened ? 'open' : ''}`}>
      <div className={`button-options ${isWidened ? 'open' : ''}`}>
          {/* <h2>Data Options</h2> */}
          {/* <button onClick={() => handleDataOption('temperature')}>Temperature</button> */}
           {/*<button onClick={() => handleDataOption('clouds')}>Clouds</button>
          <button onClick={() => handleDataOption('rainfall')}>Rainfall</button>
          <button onClick={() => handleDataOption('humidity')}>Humidity</button>
          <button onClick={() => handleDataOption('windSpeed')}>Wind Speed</button>
          <button onClick={() => handleDataOption('globalPrecipitation')}> 
          Global Precipitation 
         </button> */}
        </div>
        </div>
        </div>
  );
};

export default SidePart;

// import React from 'react';
// import DataButtons from './DataButtons';
// import './Sidebar.css';

// const SidePart = ({ isOpen, isDarkMode, handleDataOption }) => {
//   return (
//     <div className={`sidebar ${isWidened ? 'open' : ''} ${isDarkMode ? 'dark-mode' : ''}`}>
//       <DataButtons isDarkMode={isDarkMode} handleDataOption={handleDataOption} />
//     </div>
//   );
// };


// export default SidePart;
