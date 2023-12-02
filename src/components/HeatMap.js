import { useEffect, useRef } from 'react';
import {getSocketInstance} from '../api/SocketManager'

function Heatmap({ heatmapRef }) {
    const infowindow = useRef(null)
    useEffect(() => {
        const socket = getSocketInstance();
    
        if (socket) {

            infowindow.current = new google.maps.InfoWindow({
                content: 'Hello World',
                ariaLabel: "Uluru",
              });
              
          socket.on('point', (data) => {
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

        const invisibleMarker = new window.google.maps.Marker({
            position: new window.google.maps.LatLng(data.lat, data.lng),
            map: heatmap.getMap(), // Make sure it's added to the map
            icon: {
              url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkAAAAWAAAAHQAAh3YAAAAASUVORK5CYII=', // Transparent image
              size: new window.google.maps.Size(1, 1), // Set size to 1x1 to make it effectively invisible
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(0, 0),
            },
          });
    

          // Add a click event listener to the invisible marker
          invisibleMarker.addListener('click', () => {
            // Handle click event, you can customize this based on your requirements
            infowindow.current.setContent(`Clicked on point at Latitude: ${data.lat}, Longitude: ${data.lng}`);
            infowindow.current.setPosition(invisibleMarker.getPosition());
            infowindow.current.open(heatmap.getMap());
          });
      };
  return null; 
}



export default Heatmap;
