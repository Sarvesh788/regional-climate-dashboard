import React from 'react';
// import './DataButtons.css';
import './GetDataButton.css';

const GetDataButton  = ({ onClick }) => (
        <div className = 'get-data-button'>
            <button onClick={onClick}>Get Data</button> 
    </div>
);

export default GetDataButton;