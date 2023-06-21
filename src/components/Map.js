// import React, { useEffect, useState } from 'react';
// import { MapContainer, TileLayer, LayersControl } from 'react-leaflet';
// import SidePart from './SidePart';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';

// const Map = ({ darkMode, mapCenter, mapZoom, geojsonData}) => {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const map = useMap();

//   const toggleSidebar = () => {
//     setIsExpanded(!isExpanded);
//   };

//   const handleDataOption = (option) => {
//     // Handle the data option change here
//   };

//   const position = [51.505, -0.09];

//   useEffect(() => {
//     // Map related code to be added here

//     // To return a clean up function if any
//     map.setView(mapCenter, mapZoom);
//   }, [map, mapZoom, mapCenter, geojsonData]);

// useEffect(() => {
//   map.on('zoomed', handleMapZoom);
//   return () => {
//     map.off('zoomed', handleMapZoom);
//   };
// }, [map, handleMapZoom]);

//   return (
//     <div className={`map-container${isExpanded ? ' map-shifted' : ''}`}>
//       <SidePart
//         handleDataOption={handleDataOption}
//         isDarkMode={darkMode} 
//         isExpanded={isExpanded} 
//         onMenuClick={toggleSidebar} 
//         />
//       <MapContainer
//         center={position}
//         zoom={13}
//         style={{ height: '100vh', width: '100%' }}
//         dragging={true}
//         scrollWheelZoom={'center'}
//         whenReady={(map) => {
//           map.target.on('click', toggleSidebar);
//         }}
//       >
//         <LayersControl position="topright">
//           <LayersControl.BaseLayer checked name="OpenStreetMap">
//             <TileLayer
//               attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             />
//           </LayersControl.BaseLayer>
//         </LayersControl>
//       </MapContainer>
//       <button className="menu-button" onClick={toggleSidebar}>
//         <img
//           src={isExpanded ? '/images/close.svg' : '/images/menu.svg'}
//           alt="Menu"
//         />
//       </button>
//     </div>
//   );
// };

// export default Map;
