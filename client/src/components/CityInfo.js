import React from "react";

const CityInfo = ({ city }) => {
    // <CityInfo city={selectedCity} id="city-info" />
    // const latitude = city ? city.latitude : '';
    // const longitude = city ? city.longitude : '';
    if(!city){
        return null;
    }
    const { name, temperature } = city;
    return (
        <div id="city-info">
        <h2>{city.name}</h2>
        <p>Temperature: {city.temperature}</p>
        </div>
    )
}

export default CityInfo;