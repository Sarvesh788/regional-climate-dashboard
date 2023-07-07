import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, LayersControl, GeoJSON, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { geoJson } from 'leaflet';
import './App.css';
import DarkModeToggle from './components/DarkModeToggle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import SidePart from './components/SidePart';
import SearchBar from './components/SearchBar';
import CityInfo from './components/CityInfo';
import * as d3 from 'd3';
import Axios from 'axios';
import ChoroplethMap from './components/ChoroplethMap';
import YearSlider from './components/YearSlider';
import MonthSelector from './components/MonthSelector';
import LineGraph from './graphs/LineGraph';
import GetDataButton from './components/GetDataButton';

const MapComponent = ({ handleMapZoom, GeoJSON }) => {
  const map = useMap();

  return null
};

const App = () => {
  const [mapCenter, setMapCenter] = useState([20.5937, 78.9629]);
  const [mapZoom, setMapZoom] = useState(5);
  const [selectedCity, setSelectedCity] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [geojsonData, setGeojsonData] = useState(null);
  const [map, setMap] = useState(null);
  const [citiesData, setCitiesData] = useState([]);
  const [data, setdata] = useState([]);
  const [lineGraphData, setLineGraphData] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const handleDataOption = (option) => {
    // Handle the selected data option here
    console.log('Selected option:', option);
    const cityName = citiesData ? citiesData.name : '';
  };
  // const geoJSONStyle = (feature) => {
  //   return {
  //     color: 'orange',
  //     weight: 0.5, 
  //   };
  // };

  const handleYearChange = (year) => {
    console.log('Selected year:', year);
    setSelectedYear(year);
  };

  const handleMonthChange = (Month) => {
      console.log('Selected month:', Month);
      setSelectedMonth(Month);
  };

  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
    console.log(`Selected Region: ${region}`);
  }
  const path = d3.geoPath().projection(d3.geoTransform({
    point: function (x, y) {
      const point = map.latLngToLayerPoint(new L.LatLng(y, x));
      this.stream.point(point.x, point.y);
    }
  }));

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  }; 

  useEffect(() => {
    Axios.get('http://localhost:3001/api/get')
      .then((response) => {
        const apiData = response.data;
        fetch(process.env.PUBLIC_URL + '/Map_of_India.geojson')
          .then((response) => response.json())
          .then((geoData) => {
            const lineGraphData = apiData.filter((item) => {
              return (item.region_name === selectedRegion && item.Month === selectedMonth);
            }).map((item)=>{
              return {
                Year: item.Year,
                Max_temperature: item.Max_temperature,
              };
            });
            setGeojsonData(geoData);
            setLineGraphData(lineGraphData); // Set the lineGraphData state
            console.log('the data going to line graph', lineGraphData);
          });
      })
      // ...
      .catch((error) => {
        console.error('Error fetching data', error);
      });
  }, [selectedRegion, selectedMonth]); 

  const getLineGraphData = () => {
    setLineGraphData(lineGraphData);
  }

  useEffect(() => {

    const handleWheel = (event) => {
      const mapContainer = document.querySelector('.leaflet-container');
      const isCursorInsideMap = mapContainer?.contains(event.target);

      if (isCursorInsideMap && event.ctrlKey) {
        event.preventDefault();
        event.currentTarget.parentElement.scrollLeft += event.deltaY;
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [map, mapZoom, mapCenter]); 

  const handleMapZoom = (event) => {
    if (event.target._zoom < 5) {
      event.target.setZoom(5);
    }
    if (event.target._zoom > 7) {
      event.target.setZoom(7);
    }
  };

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <h1><br></br>Indian Meteorological Department</h1>
      <SearchBar isDarkMode={darkMode} />
      <button className="toggle-button" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <SidePart handleDataOption={handleDataOption} isDarkMode={darkMode} isExpanded={isExpanded} />
      <DarkModeToggle DarkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div className="left-section">
        <div className={`map-container${isExpanded ? ' map-shifted' : ''}`}>
          <MapContainer
            center={mapCenter}
            zoom={mapZoom}
            style={{
              height: 'calc(100vh - 100px)',
              width: 'calc(100% - 100px)',
              margin: '0 auto'
            }}
            maxBounds={[
              [35, 65],
              [10, 100],
            ]}
            onzoomend={handleMapZoom}
          >
            <MapComponent setMap={setMap} />
            <LayersControl position="topright">
              <LayersControl.BaseLayer checked name="Map of India">
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=4fd83f84a53f4af38385f3559906aef4"
                  className="custom-tile-layer"
                />
              </LayersControl.BaseLayer>
            </LayersControl>
            {citiesData.map((city) => (
              <Marker
                key={city.name}
                position={[city.latitude, city.longitude]}>
                <Popup>{city.name}</Popup>
              </Marker>
            ))}
            <ChoroplethMap setGeojsonData={setGeojsonData} onRegionSelect={handleRegionSelect} selectedYear={selectedYear} selectedMonth={selectedMonth}/>
            {/* {geojsonData && ( */}
        {/* // <GeoJSON key="india-border" data={geojsonData} style={geoJSONStyle} /> */}
      {/* )} */}
          </MapContainer>
          <div>
          <h1>Temperature Data</h1>
          <GetDataButton onClick={getLineGraphData} />
          <LineGraph data = {lineGraphData} />
          </div>
          <div className="selectors">
        <YearSlider minYear={1900} maxYear={2022} onChange={handleYearChange} />
        <MonthSelector onChange={handleMonthChange} />
      </div>
          <div id="city-info" className="city-info">
            <CityInfo city={selectedCity} />
            {
              data.map((val, index) => {
                return (<h1 key={index}>Year: {val.Year}</h1>);
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;