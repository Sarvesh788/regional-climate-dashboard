import { style } from 'd3';
import React from 'react';
import './DataButtons.css';

const RadioButtonGroup = ({ selectedButton, onRadioButtonChange }) => {

  return (
    <div className="radio-buttons">
      <label>
        <input
          type="radio"
          value="max"
          checked={selectedButton === 'max'}
          onChange={onRadioButtonChange}
        />
        Max Temperature
      </label>
      <label>
        <input
          type="radio"
          value="min"
          checked={selectedButton === 'min'}
          onChange={onRadioButtonChange}
        />
        Min Temperature
      </label>
      <label>
        <input
          type="radio"
          value="both"
          checked={selectedButton === 'both'}
          onChange={onRadioButtonChange}
        />
        Both
      </label>
    </div>
  );
};

export default RadioButtonGroup;
