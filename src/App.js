import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './App.css'; // Import your custom CSS file for additional styling
import DarkModeToggle from './components/DarkModeToggle'; 
import SideBar from './components/SidePart';

const App = () => { 
  const [mapCenter, setMapCenter] = useState([20.5937, 78.9629]);
  const [mapZoom, setMapZoom] = useState(5);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const handleDataOption = (option) => {
    // Handle the selected data option here
    console.log('Selected option:', option);
  };
  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  }; // to get dark mode

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

  return (
    <div className={`App ${isDarkMode ? 'dark-mode' : ''}`}>      
      <h1>Indian Meteorological Department Dashboard</h1>
      <SideBar handleDataOption={handleDataOption} />
      <DarkModeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <div className="map-container">
        <MapContainer
          center={mapCenter}
          zoom={mapZoom}
          style={{ height: 'calc(100vh - 100px)', 
          width: 'calc(100% - 200px)', 
          margin: '0 auto' }}
          maxBounds={[
            [35, 65], // Southwestern coordinates of India
            [10, 100], // Northeastern coordinates of India
          ]}
          onzoomend={handleMapZoom}
        >
          <LayersControl position="topright">
            <LayersControl.BaseLayer checked name="Map of India">
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"
                minNativeZoom={5}
                maxNativeZoom={10}
                className="custom-tile-layer"
              />
            </LayersControl.BaseLayer>
            {/* To add more layers for weather parameters here */}
          </LayersControl>
        </MapContainer>
      </div>
    </div>
  );
};

export default App;
