import { useEffect } from 'react';
import {getSocketInstance} from '../api/SocketManager'


const Drone = ({ droneRef }) => {

    useEffect(() => {
        const socket = getSocketInstance();
    
        if (socket) {
          socket.on('coordinate', (data) => {
            updateMarkerPosition(data);
          });

        } else {
          console.error('Socket is not initialized. Call connectSocket() first.');
        }
    
      }, [droneRef]);

  const updateMarkerPosition = (data) => {
    const newMarkerPosition = new window.google.maps.LatLng(data.lat, data.lng);
    droneRef.current.setPosition(newMarkerPosition);
  };

  return null; 
};

export default Drone;
