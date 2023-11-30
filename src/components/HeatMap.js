import { useEffect } from 'react';
import {connectSocket} from '../api/SocketManager'

function Heatmap({ heatmapRef }) {
  useEffect(() => {
    connectSocket().on('point', (data) => {
        console.log(data)
        updateDataArray(data)
    });
    }, [])

    const updateDataArray = (data) => {
        // Get the current heatmap instance using the ref
        const heatmap = heatmapRef.current;
    
        // Convert MVCArray to a regular array
        const currentData = heatmap.getData().getArray();
        console.log(currentData)
    
        const newDataPoint = [new window.google.maps.LatLng(data.lat, data.lng)];
        const updatedData = [...currentData, ...newDataPoint];
        heatmap.setData(updatedData);
      };
  return null; 
}



export default Heatmap;
