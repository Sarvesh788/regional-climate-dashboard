import React, { useState } from 'react';
import './YearSlider.css';

const YearSlider = ({ minYear, maxYear, onChange }) => {
  const [year, setYear] = useState(minYear);

  const handleChange = (event) => {
    setYear(event.target.value);
    onChange(event.target.value);
  };

  return (
    <div className="year-slider">
      <input
        type="range"
        min={minYear}
        max={maxYear}
        value={year}
        onChange={handleChange}
      />
      <div className = "selected-year">Selected Year: {year}</div>
    </div>
  );
};

export default YearSlider;
