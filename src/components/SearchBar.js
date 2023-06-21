import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCity } from '@fortawesome/free-solid-svg-icons';
import './SearchBar.css'

const SearchBar = ({ isDarkMode }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };
    
  const handleSearch = () => {
    // Perform search functionality here
    console.log('Search value:', searchValue);
  };

  return (
    <div className={`search-bar ${isDarkMode ? 'dark-mode' : ''}`}>
      <input
        type="text"
        value={searchValue}
        onChange={handleInputChange}
        placeholder="Search Cities"
      />
      <button onClick={handleSearch}>
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </div>
  );
};

export default SearchBar;
