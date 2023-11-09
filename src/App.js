import Map from "./components/Map2"
import { platformClient } from './api/PlatformClient';
import { Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import io from 'socket.io-client'; // Breaks callback functionality by eliminating unused import
import {triggerCustomEvent, onCustomEventResponse} from './api/SocketManager'


const App = () => {
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });
  const [points, setPoints] = useState(null)
  //const [dronePos, setDronePos] = useState({latitude: null, longitude: null})
  const [droneLocation, setDroneLocation] = useState('');
  //const [listening, setListening] = useState(false);
  //-------------------------------------------------------------------------------
  const [buttonStatus, setButtonStatus] = useState(false)

  
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

    onCustomEventResponse((data) => {
      console.log(data);
    }); 

  }, [])
 
  function handleGeoLocationCenter(position) {
    const coords = position.coords;
    console.log(coords)
    setMapCenter({ lat: parseFloat(coords.latitude), lng: parseFloat(coords.longitude) });
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


  //----------------------------------------------------------------------------------------------------------------------------

  const handleClick = () => {
    if (buttonStatus === false) {
      setButtonStatus(true)
    } else  {
      setButtonStatus(false)
    }
  }



  //----------------------------------------------------------------------------------------------------------------------------

  return (
    <div>
      <Typography>Latitude: {mapCenter.lat}</Typography>
      <Typography>Longitude: {mapCenter.lng}</Typography>
      <Button onClick={getPoints} type="submit" variant="contained" color="primary"> Request Readings </Button>
      <Button onClick={handleClick} type="submit" variant="contained" color="primary"> {buttonStatus? "Disonnect drone" : "Connect drone"} </Button>
      <Button onClick={triggerCustomEvent} type="submit" variant="contained" color="primary"> {droneLocation} CONNECT DRONE II </Button>
      <Map latitude={mapCenter.lat} longitude={mapCenter.lng} points={points} droneLocation={droneLocation}/>
    </div>
  );
};

export default App;