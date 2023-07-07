import React from 'react';
import './DataButtons.css';

const GetDataButton  = ({ onClick }) => (
    <div className = 'data-buttons'>
    <button onClick={onClick}>Get Data</button> 
    </div>
);

export default GetDataButton;