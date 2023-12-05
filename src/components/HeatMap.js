import { useEffect, useRef } from 'react';
import { getSocketInstance } from '../api/SocketManager';

function Heatmap({ heatmapRef, mapRef }) {
  const infowindow = useRef(null);

  useEffect(() => {
    const socket = getSocketInstance();

    if (socket) {
      infowindow.current = new window.google.maps.InfoWindow({
        content: 'Hello World',
        ariaLabel: 'Uluru',
      });

      const circles = []; 

      socket.on('point', (data) => {
        const circle = createInvisibleCircle(mapRef.current, data);
        circles.push(circle);
        updateDataArray(data);
      });

      // Cleanup markers when the component unmounts
      return () => {
        circles.forEach((circle) => circle.setMap(null));
      };
    } else {
      console.error('Socket is not initialized. Call connectSocket() first.');
    }
  }, [heatmapRef, mapRef]);

  const createInvisibleCircle = (map, data) => {
    const circle = new window.google.maps.Circle({
      center: new window.google.maps.LatLng(data.lat, data.lng),
      map: map,
      radius: 10,
      strokeColor: 'transparent',
      fillColor: 'transparent',
      fillOpacity: 0,
    });
  
    // Add a click event listener to the invisible circle
    window.google.maps.event.addListener(circle, 'click', () => {
      handleCircleClick(data);
    });
  
    return circle;
  };

  const updateDataArray = (data) => {
    const heatmap = heatmapRef.current;
    const currentData = heatmap.getData().getArray();

    const newDataPoint = new window.google.maps.LatLng(data.lat, data.lng);
    const updatedData = [...currentData, newDataPoint];
    heatmap.setData(updatedData);
  };

  const handleCircleClick = (data) => {
    const clickedLocation = new window.google.maps.LatLng(data.lat, data.lng);
    infowindow.current.setContent(`Latitude: ${data.lat} <br> Longitude: ${data.lng} <br> Ice Thickness: ${data.value}.00 inches`);
    infowindow.current.setPosition(clickedLocation);
    infowindow.current.open(mapRef.current);
  };

  return null;
}

export default Heatmap;
