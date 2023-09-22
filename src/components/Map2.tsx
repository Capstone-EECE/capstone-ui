// eslint-disable-next-line node/no-extraneous-import
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { platformClient } from '../api/PlatformClient';




function Map({latitude, longitude, points}) {
  const [map, setMap] = useState(null);
  const [heatmap, setHeatmap] = useState(null);


  useEffect(() => {
    // Load the Google Maps JavaScript API
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAKpN7-ZW0NvloUiicf2yK_4EwWAQT-4EA&libraries=visualization`;
    script.async = true;
    script.defer = true;
    script.onload = initializeMap;
    document.head.appendChild(script);

    return () => {
      if (heatmap) {
        heatmap.setMap(null);
      }
      if (map) {
        map.setMap(null);
      }
      document.head.removeChild(script);
    };
  }, [latitude, longitude]);

  async function initializeMap() {
    let map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: { lat: latitude, lng: longitude },
      mapTypeId: 'satellite',
    });

    let heatmap = new google.maps.visualization.HeatmapLayer({
      data: await getPoints([]),
      map: map,
    });

    setMap(map);
    setHeatmap(heatmap);
  }

  function toggleHeatmap() {
    if (heatmap) {
      heatmap.setMap(heatmap.getMap() ? null : map);
    }
  }

  function changeGradient() {
    if (heatmap) {
      const gradient = [
        "rgba(0, 255, 255, 0)",
        "rgba(0, 255, 255, 1)",
        "rgba(0, 191, 255, 1)",
        "rgba(0, 127, 255, 1)",
        "rgba(0, 63, 255, 1)",
        "rgba(0, 0, 255, 1)",
        "rgba(0, 0, 223, 1)",
        "rgba(0, 0, 191, 1)",
        "rgba(0, 0, 159, 1)",
        "rgba(0, 0, 127, 1)",
        "rgba(63, 0, 91, 1)",
        "rgba(127, 0, 63, 1)",
        "rgba(191, 0, 31, 1)",
        "rgba(255, 0, 0, 1)",
      ];
      heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
    }
  }

  function changeRadius() {
    if (heatmap) {
      heatmap.set('radius', heatmap.get('radius') ? null : 20);
    }
  }

  function changeOpacity() {
    if (heatmap) {
      heatmap.set('opacity', heatmap.get('opacity') ? null : 0.2);
    }
  }

  async function getPoints(coordinates: Object[]) {
    const googleType = []
      try {
        const response = await platformClient.fetchData('capstone/points')
        console.log("#############")
        console.log(response)
        for (const coor of response) {
          const latitude = coor[0];
          const longitude = coor[1];
          googleType.push(new google.maps.LatLng(latitude, longitude))
        }
      } catch(error) {
        console.log(error)
      }
      // Request points
      
      return googleType
    }
  

  return (
    <div>
      <div id="map" style={{ height: '600px', width: '100%' }}></div>
      <Button id="toggle-heatmap" variant="contained" color="primary" onClick={toggleHeatmap}>Toggle Heatmap</Button>
      <Button id="change-gradient" variant="contained" color="primary" onClick={changeGradient}>Change gradient</Button>
      <Button id="change-radius" variant="contained" color="primary" onClick={changeRadius}>Change radius</Button>
      <Button id="change-opacity" variant="contained" color="primary" onClick={changeOpacity}>Change opacity</Button>
    </div>
  );
}

export default Map;
