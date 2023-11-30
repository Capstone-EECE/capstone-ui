import { useEffect } from 'react';
import {getSocketInstance} from '../api/SocketManager'

function Heatmap({ heatmapRef }) {
    useEffect(() => {
        const socket = getSocketInstance();
    
        if (socket) {
          socket.on('point', (data) => {
            console.log('point')
            updateDataArray(data);
          });
        } else {
          console.error('Socket is not initialized. Call connectSocket() first.');
        }
    
      }, [heatmapRef]);

    const updateDataArray = (data) => {
        const heatmap = heatmapRef.current;
        const currentData = heatmap.getData().getArray();
    
        const newDataPoint = [new window.google.maps.LatLng(data.lat, data.lng)];
        const updatedData = [...currentData, ...newDataPoint];
        heatmap.setData(updatedData);
      };
  return null; 
}



export default Heatmap;
