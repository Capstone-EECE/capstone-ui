import Map from "./components/Map2"
import { platformClient } from './api/PlatformClient';
import { Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import io from 'socket.io-client'; // Breaks callback functionality by eliminating unused import
import {onCustomEventResponse} from './api/SocketManager'


const App = () => {
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });
  const [droneConnected, setDroneConnected] = useState(false)
  const [pointButtonStatus, setPointButtonStatus] = useState(false)
  const [points, setPoints] = useState(null)
  const [gpsButtonStatus, setgpsButtonStatus] = useState(false)
  const [coordinates, setCoordinates] = useState(null)

  
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
    setMapCenter({ lat: parseFloat(coords.latitude), lng: parseFloat(coords.longitude) });
  };

  //----------------------------------------------------------------------------------------------------------------------------


  const connectToDrone = async () => {
    if (droneConnected === false) {
      setDroneConnected(true)
      // connect to server socket
    } else {
      setDroneConnected(false)
    }
  }

  const pointsEventHandler = async () => {
    if (pointButtonStatus === false) {
      setPointButtonStatus(true)
      const googleType = []
      try {
        
        const response = await platformClient.startSensorReading()

        // SOCKET (?)
        for (const coor of response) {
          const latitude = coor[0];
          const longitude = coor[1];
          googleType.push(new google.maps.LatLng(latitude, longitude))
        }
        setPoints(googleType)
      } catch(error) {
        console.log(error)
      } 
    } else  {
      setPointButtonStatus(false)
      await platformClient.stopSensorReading()
    }
  }

  const coordinateEventHandler = async () => {
    if (gpsButtonStatus === false) {
      setgpsButtonStatus(true)
      try {
        
        const response = await platformClient.startGPSReading()
        setCoordinates(response)
        // SOCKET (?)
      } catch(error) {
        console.log(error)
      } 
    } else  {
      setgpsButtonStatus(false)
      await platformClient.startGPSReading()
    }
  }



  //----------------------------------------------------------------------------------------------------------------------------

  return (
    <div>
      <Typography>Latitude: {mapCenter.lat}</Typography>
      <Typography>Longitude: {mapCenter.lng}</Typography>
      <Button onClick={connectToDrone} type="submit" variant="contained" color="primary"> {droneConnected? "Disconnect drone" : "Connect Drone"} </Button>
      <Button onClick={coordinateEventHandler} type="submit" variant="contained" color="primary" disabled={!droneConnected}> {gpsButtonStatus? "Stop GPS" : "Start GPS"} </Button>
      <Button onClick={pointsEventHandler} type="submit" variant="contained" color="primary" disabled={!droneConnected}> {pointButtonStatus? "Stop Readings" : "Request Readings"} </Button>
      <Map latitude={mapCenter.lat} longitude={mapCenter.lng} points={points} droneLocation={0}/>
    </div>
  );
};

export default App;