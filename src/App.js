import Map from "./components/Map2"
import { platformClient } from './api/PlatformClient';
import { Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';


const App = () => {
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });
  const [points, setPoints] = useState(null)
  //const [dronePos, setDronePos] = useState({latitude: null, longitude: null})
  const [droneLocation, setDroneLocation] = useState(null);
  const [listening, setListening] = useState(false);

  
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

/*   useEffect(() => {

    const handleLocationUpdate = (coordinates) => {
      setDroneLocation(coordinates);
    };

    if (listening) {
      console.log("I AM LISTENING")
      platformClient.listenToDroneLocationUpdates(handleLocationUpdate);
    } else {
      console.log("NOT ANYMORE")
      platformClient.stopListeningToDroneLocationUpdates();
    }

    return () => {
      platformClient.stopListeningToDroneLocationUpdates();
    };
  }, [listening]);

  const toggleListening = () => {
    setListening(!listening);
  }; */

 
  function handleGeoLocationCenter(position) {
    const coords = position.coords;
    console.log(coords)
    setMapCenter({ lat: parseFloat(coords.latitude), lng: parseFloat(coords.longitude) });
    console.log('Position Updated')
  };

  async function getPoints() {
    const googleType = []
    try {
      
      const response = await platformClient.getThickness()
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

  function handleSocketConnection() {
    const handleLocationUpdate = (coordinates) => {
      setDroneLocation(coordinates);
    };
    platformClient.listenToDroneLocationUpdates(handleLocationUpdate);
  }
  

  return (
    <div>
      <Typography>Latitude: {mapCenter.lat}</Typography>
      <Typography>Longitude: {mapCenter.lng}</Typography>
      <Button onClick={getPoints} type="submit" variant="contained" color="primary"> Request Readings </Button>
      <Button onClick={handleSocketConnection} type="submit" variant="contained" color="primary">
        {listening ? 'Stop Listening' : 'Start Listening'}
      </Button>
      <Map latitude={mapCenter.lat} longitude={mapCenter.lng} points={points} droneLocation={droneLocation}/>
    </div>
  );
};

export default App;