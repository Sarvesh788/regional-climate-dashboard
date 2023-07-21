    import React, { useEffect, useState } from 'react';
    import * as d3 from 'd3';
    import { GeoJSON } from 'react-leaflet';
    import Axios from 'axios';

    const ChoroplethMap = ({onRegionSelect, selectedYear, selectedMonth}) => {
      const [geojsonData, setGeojsonData] = useState(null);
      const [colorScale, setColorScale] = useState(null);
      const [loading, setLoading] = useState(true);

      const geoJSONStyle = (feature) => {
        const newColorScale = d3
        .scaleLinear()
        .domain([-2, -1.5, -0.5, 0.5, 1,5 , 2]) // Define temperature ranges
        .range(["#FF0000", "#2A00D5", "#5500AA", "#7F007F", "#AA0055", "#D5002A"]); // Assign colors for each range

        // console.log('newColorScale(feature.properties.deviation): ', newColorScale(feature.properties.deviation));
        const color = newColorScale(feature.properties.deviation);
        return {
          fillColor: color,
          weight: 2,
          opacity: 1, 
          color: 'white',
          dashArray: '3',
          fillOpacity: 0.7 
        };
      };

        useEffect(() => {
          setLoading(true);
          Axios.get('http://localhost:3001/api/get')
            .then((response) => {
              let apiData = response.data;
              apiData = apiData.filter(item => item.Year === parseInt(selectedYear) && item.Month === selectedMonth);
              return fetch(process.env.PUBLIC_URL + '/Map_of_India.geojson')
                .then((response) => response.json())
                .then((geoData) => {
                  return { geoData, apiData };
                });
            })
            .then(({ geoData, apiData }) => {
              geoData.features.forEach((feature) => {
                const region = feature.properties.Dist_Name;
                const regionData = apiData.filter((item) => item.region_name === region);
                feature.properties.deviation = 0;
                regionData.forEach((data) => {
                  if (data) {
                    feature.properties.deviation = data.Deviation;
                  }
                });
              });
              setGeojsonData(geoData);
              const [minDeviation, maxDeviation] = d3.extent(geoData.features, d => d.properties.deviation);
        
              const newColorScale = d3
                .scaleLinear()
                .domain([-20, -3, 2, 5, 10, 20]) // Define temperature ranges
                .range(["blue", "cyan", "green", "yellow", "orange", "red"]); // Assign colors for each range
        
              setColorScale(newColorScale);
              setLoading(false);
            })
            .catch((error) => {
              console.error('Error fetching data', error);
              setLoading(false);
            });
        }, [selectedYear, selectedMonth]);
      


  const onEachFeature = (feature, layer) => {
    const region = feature.properties.Dist_Name;
    layer.on({
      mouseover: (e) => {
        const layer = e.target;
        layer.setStyle({
          weight: 5,
          color: '#666',
          dashArray: '',
          fillOpacity: 0.7,
        }); 
      },
      mouseout: (e) => {
        const layer = e.target;
        layer.setStyle(geoJSONStyle(feature));
      },
      click: (e) => {
        if (typeof onRegionSelect === 'function') {
          onRegionSelect(region);
        } else {
          console.error('onRegionSelect is not a function');
        }
      },
    });
  };

  const addTooltip = (feature, layer) => {
    if (feature.properties && feature.properties.Dist_Name) {
      layer.bindTooltip(feature.properties.Dist_Name + ': ' + feature.properties.deviation);
    }
  };

  return loading ? (
    <div> Loading...</div>
    ) : geojsonData ? (
    <GeoJSON
      key="india-border"
      data={geojsonData}
      style={geoJSONStyle}
      onEachFeature={(feature, layer) => {
        onEachFeature(feature, layer);
        addTooltip(feature, layer);
      }}
    />
  ) : null;
  };

  export default ChoroplethMap;
