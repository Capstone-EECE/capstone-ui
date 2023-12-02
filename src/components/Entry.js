import Map from "./Map"
import BatteryComponent from "./Battery"
import { platformClient } from '../api/PlatformClient';
import { Button, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import {connectSocket, disconnectSocket} from '../api/SocketManager'

const Entry = () => {
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });
  const [droneConnected, setDroneConnected] = useState(false)
  const [pointButtonStatus, setPointButtonStatus] = useState(false)
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
      try {
        connectSocket()
        await platformClient.connectDrone()
        setDroneConnected(true)
      } catch(error) {
        console.log(error)
      }

    } else {
      disconnectSocket()
      setDroneConnected(false)
    }
  }

  const pointsEventHandler = async () => {
    if (pointButtonStatus === false) {
      try {
        await platformClient.startSensorReading()
        setPointButtonStatus(true)
      } catch(error) {
        console.log(error)
      } 
    } else  {
      await platformClient.stopSensorReading()
      setPointButtonStatus(false)
    }
  }

  const coordinateEventHandler = async () => {
    if (gpsButtonStatus === false) {
      try { 
        await platformClient.startGPSReading()
        setgpsButtonStatus(true)
      } catch(error) {
        console.log(error)
      } 
    } else  {
      await platformClient.stopGPSReading()
      setgpsButtonStatus(false)
    }
  }



  //----------------------------------------------------------------------------------------------------------------------------

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={8}>
        <Button onClick={connectToDrone} type="submit" variant="contained" color="primary"> {droneConnected? "Disconnect drone" : "Connect Drone"} </Button>
        <Button onClick={coordinateEventHandler} type="submit" variant="contained" color="primary" disabled={!droneConnected}> {gpsButtonStatus? "Stop GPS" : "Start GPS"} </Button>
        <Button onClick={pointsEventHandler} type="submit" variant="contained" color="primary" disabled={!droneConnected}> {pointButtonStatus? "Stop Readings" : "Request Readings"} </Button>
        </Grid>
        <Grid item xs={4}>
          <BatteryComponent droneConnected={droneConnected}/>
        </Grid>
      </Grid>
      <Map droneConnected={droneConnected} mapCenter={mapCenter}/>
    </div>
  );
};

export default Entry;

