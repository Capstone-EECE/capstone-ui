import Map from "./components/Map2"
import { platformClient } from './api/PlatformClient';
import { Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
//import { google } from '@react-google-maps/api'; // or the appropriate import path


const App = () => {
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });
  const [points, setPoints] = useState(null)

  
  /**
   * Initialize with current coordinates
   */
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handleGeoLocationCenter, () => {}, { enableHighAccuracy: true });
    }
    else {
      console.log("Browser geolocation not enabled")
    }
  }, [])

 
  function handleGeoLocationCenter(position) {
    const coords = position.coords;
    console.log(coords)
    setMapCenter({ lat: parseFloat(coords.latitude), lng: parseFloat(coords.longitude) });
    console.log('Position Updated')
  };

  async function getPoints() {
    const googleType = []
      try {
        const response = await platformClient.fetchData('capstone/points')
        for (const coor of response) {
          const latitude = coor[0];
          const longitude = coor[1];
          googleType.push(new google.maps.LatLng(latitude, longitude))
        }
        setPoints(googleType)
      } catch(error) {
        console.log(error)
      }      
    }

  return (
    <div>
      <Typography>Latitude: {mapCenter.lat}</Typography>
      <Typography>Longitude: {mapCenter.lng}</Typography>
      <Button onClick={getPoints} type="submit" variant="contained" color="primary"> Request Readings </Button>
      <Map latitude={mapCenter.lat} longitude={mapCenter.lng} points={points}/>
    </div>
  );
};

export default App;