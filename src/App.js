import Map from "./components/Map"
import { platformClient } from './api/PlatformClient';
import { Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import {connectSocket, disconnectSocket} from './api/SocketManager'


const App = () => {
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });
  const [droneConnected, setDroneConnected] = useState(false)
  const [pointButtonStatus, setPointButtonStatus] = useState(false)
  const [points, setPoints] = useState(null)
  const [gpsButtonStatus, setgpsButtonStatus] = useState(false)

  
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
    setMapCenter({ lat: parseFloat(coords.latitude), lng: parseFloat(coords.longitude) });
  };

  //----------------------------------------------------------------------------------------------------------------------------


  const connectToDrone = async () => {
    if (droneConnected === false) {
      setDroneConnected(true)
      connectSocket()
      await platformClient.connectDrone()
    } else {
      setDroneConnected(false)
      disconnectSocket()
    }
  }

  const pointsEventHandler = async () => {
    if (pointButtonStatus === false) {
      try {
        setPointButtonStatus(true)
        await platformClient.startSensorReading()
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
      try { 
        setgpsButtonStatus(true)
        await platformClient.startGPSReading()
      } catch(error) {
        console.log(error)
      } 
    } else  {
      setgpsButtonStatus(false)
      await platformClient.stopGPSReading()
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
      <Map points={points} droneConnected={droneConnected} mapCenter={mapCenter}/>
    </div>
  );
};

export default App;



/* 
      
      const googleType = []
        // SOCKET (?)
        for (const coor of response) {
          const latitude = coor[0];
          const longitude = coor[1];
          googleType.push(new google.maps.LatLng(latitude, longitude))
        }
*/