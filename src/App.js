import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, LayersControl, GeoJSON, Marker, Popup, useMap} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './App.css';
import DarkModeToggle from './components/DarkModeToggle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import SidePart from './components/SidePart';
import SearchBar from './components/SearchBar';
import CityInfo from './components/CityInfo';
import * as d3 from 'd3';
// import Map from './components/Map';
// import DataButtons from './components/DataButtons';

const MapComponent = ({ handleMapZoom }) => {
  const map = useMap();

  useEffect(() => {
    map.on('zoomend', handleMapZoom);
    return () => {
      map.off('zoomend', handleMapZoom);
    };
  }, [map, handleMapZoom]);

  return null; // This component doesn't need to render anything
};

const App = () => { 
  const [mapCenter, setMapCenter] = useState([20.5937, 78.9629]);
  const [mapZoom, setMapZoom] = useState(5);
  const [selectedCity, setSelectedCity] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [geojsonData, setGeojsonData] = useState(null); // update for geojson data
  // const path = d3.geoPath().projection(d3.geoTransform({ point: projectPoint }));
  const [map, setMap] = useState(null);
  const [citiesData, setCitiesData] = useState([]);

  const handleDataOption = (option) => {
    // Handle the selected data option here
    console.log('Selected option:', option);  
    const cityName = citiesData?citiesData.name : '';
  };

  const geoJSONStyle = (feature) => {
    return {
      color: 'orange', // Set the border color
      weight: 2, // Set the border width
      fillColor: colorScale(feature.properties.temperature), // Set the fill color
      fillOpacity: 0.5, // Set the fill opacity
    };
  };  

  const [minTemperature, maxTemperature] = geojsonData ? d3.extent(geojsonData.features, d => d.properties.temperature) : [0, 0];
  
  const colorScale = d3.scaleSequential()
    .domain([minTemperature, maxTemperature])
    .interpolator(d3.interpolateCool); // interpolateRdYlBu can be better 

  const handleCityClick = (city) => {
    setSelectedCity(city);
    setMapCenter([city.latitude, city.longitude]);
    setMapZoom(7);
    // const cityInfoElement = document.getElementById('city-info');
    // cityInfoElement.scrollIntoView({ behavior: 'smooth' });
    scrollToCityInfo();
  };

  const scrollToCityInfo = () => {
    const cityInfoElement = document.getElementById('city-info');
    cityInfoElement.scrollIntoView({ behavior: 'smooth' });
  };

  const path = d3.geoPath().projection(d3.geoTransform({
    point: function(x, y) {
      const point = map.latLngToLayerPoint(new L.LatLng(y, x));
      this.stream.point(point.x, point.y);
    }
  }));
  
  function projectPoint(x, y) {
    const point = map.latLngToLayerPoint(new L.LatLng(y, x));
    this.stream.point(point.x, point.y);
  }

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  }; // to get dark mode

  useEffect(() => {
    if(!map) return;

    const svg = d3.select(map.getPanes().overlayPane).append('svg');
    svg.attr('style', `width: ${map.getSize().x}px; height: ${map.getSize().y}px;`);

    const g = svg.append('g').attr('class', 'shapes');
    g.attr('transform', `translate(${-map.getBounds().min.x}, ${-map.getBounds().min.y})`);

    g.selectAll('path').attr('d', path);

    if (geojsonData) {
      const update = g.selectAll('path')
        .data(geojsonData.features);
        update.enter()
      .append('path')
      .attr('d', path)
      .attr('fill', d => colorScale(d.properties.temperature)); // update for geojson data
      // ...
    }
    
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
  }, [map, mapZoom, mapCenter]); // useEffect function has to have its own return. 
  
  useEffect(() => {
    // d3.csv(process.env.PUBLIC_URL + '/cities.csv').then((data) => {
      // setCitiesData(data);
      // console.log('Cities data:', data);
  }, []);
  
  useEffect(() => {
    fetch(process.env.PUBLIC_URL + '/Map_of_India.geojson')
      .then((response) => response.json())
      .then((data) => {
        setGeojsonData(data);
        console.log('GeoJSON data:', data);
  });
  }, []);

  const handleMapZoom = (event) => {
    // Prevent zooming out beyond the minimum zoom level
    if (event.target._zoom < 5) {
      event.target.setZoom(5);
    }
    if (event.target._zoom > 7) {
      event.target.setZoom(7); 
    }
  };
  d3.json('/Map_of_India.geojson').then((geojson) => {
    // ...
  });

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>      
      <h1><br></br>Indian Meteorological Department</h1>
      <SearchBar isDarkMode={darkMode} />
      <button className="toggle-button" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <SidePart handleDataOption={handleDataOption} isDarkMode={darkMode} isExpanded={isExpanded}/>
      <DarkModeToggle DarkMode={darkMode} toggleDarkMode={toggleDarkMode} /> 
      <div className="left-section">
      <div className={`map-container${isExpanded ? ' map-shifted' : ''}`}>  
        <MapContainer
          center={mapCenter}
          zoom={mapZoom}
          style={{ height: 'calc(100vh - 100px)', 
          width: 'calc(100% - 100px)', 
          margin: '0 auto' }}
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
              minNativeZoom={5}
              maxNativeZoom={10}
              className="custom-tile-layer"
            />
            </LayersControl.BaseLayer>
          </LayersControl>
          {geojsonData && (
           <GeoJSON key="india-border" data={geojsonData} style={geoJSONStyle} />)}

        {citiesData.map((city) => (
          <Marker 
          key={city.name} 
          position={[city.latitude, city.longitude]}
          eventHandlers={{
            click: () => handleCityClick(city),
            }}>
            <Popup>{city.name}</Popup>
          </Marker>
        ))}

        </MapContainer> 
        <div id = "city-info" className="city-info">
      <CityInfo city={selectedCity} />
      </div>
      </div>
    </div>
    </div>
  );
};

export default App;