import React, { useState } from 'react';

const MonthSelector = ({ onChange }) => {
  const [month, setMonth] = useState('');

  const handleChange = (event) => {
    setMonth(event.target.value);
    onChange(event.target.value);
  };

  return (
    <div>
      <select value={month} onChange={handleChange}>
        <option value="">Select a month</option>
        <option value="jan">January</option>
        <option value="feb">February</option>
        <option value="mar">March</option>
        <option value="apr">April</option>
        <option value="may">May</option>
        <option value="jun">June</option>
        <option value="jul">July</option>
        <option value="aug">August</option>
        <option value="sep">September</option>
        <option value="oct">October</option>
        <option value="nov">November</option>
        <option value="dec">December</option>
        <option value="annual">Annual</option>
        <option value="winter">Premonsoon</option>
        <option value="postmonsoon">Postmonsoon</option>
      </select>
    </div>
  );
};

export default MonthSelector;
