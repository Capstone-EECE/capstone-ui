import { useEffect } from 'react';
import {connectSocket} from '../api/SocketManager'


const Drone = ({ droneRef }) => {

  useEffect(() => {
    connectSocket().on('coordinate', (data) => {
        console.log(data)
        updateMarkerPosition(data)
    });
    
  }, []);

  const updateMarkerPosition = (data) => {
    const newMarkerPosition = new window.google.maps.LatLng(data.lat, data.lng);
    droneRef.current.setPosition(newMarkerPosition);
  };

  return null; 
};

export default Drone;
