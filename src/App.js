import Map from "./components/Map2"
import { platformClient } from './api/PlatformClient';
import { Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';


const App = () => {
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });

  
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

  const handleBackendRequest = async () => {
    try {
    const response = await platformClient.fetchData('capstone')
    console.log(response)
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <div>
      <Typography>Latitude: {mapCenter.lat}</Typography>
      <Typography>Longitude: {mapCenter.lng}</Typography>
      <Button onClick={handleBackendRequest} type="submit" variant="contained" color="secondary"> CLICK ME </Button>
      <Map latitude={mapCenter.lat} longitude={mapCenter.lng}/>
    </div>
  );
};

export default App;