// eslint-disable-next-line react-hooks/exhaustive-deps
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlane } from "@fortawesome/free-solid-svg-icons";
import React from 'react';


let newMarker;
let newMap;

function Map({points, droneLocation, droneConnected, mapCenter }) {
  const [map, setMap] = useState(null);
  const [heatmap, setHeatmap] = useState(null);
  const [marker, setMarker] = useState(null)

  useEffect(() => {
    if (window.google) {
      initializeMap();
    }
  }, [points, droneLocation, mapCenter, droneConnected]);


  useEffect(() => {
    // Update marker position when droneLocation changes
    if (marker && droneLocation) {
      const newMarkerPosition = new window.google.maps.LatLng(droneLocation.lat, droneLocation.lng);
      newMarker.setPosition(newMarkerPosition);
    }
  }, [droneLocation, marker]);


  function initializeMap() {
    newMap = new window.google.maps.Map(document.getElementById('map'), {
      zoom: 9,
      center: { lat: mapCenter.lat, lng: mapCenter.lng },
    });

    let heatmap = new window.google.maps.visualization.HeatmapLayer({
      data: points? points : [],
      map: newMap,
    });

    newMarker = new window.google.maps.Marker({
      position: { lat: mapCenter.lat, lng: mapCenter.lng },
      map: newMap,
      icon: {
        path: faPlane.icon[4] as string,
        fillColor: "#0000ff",
        fillOpacity: 1,
        anchor: new google.maps.Point(
          faPlane.icon[0] / 2, // width
          faPlane.icon[1] // height
        ),
        strokeWeight: 1,
        strokeColor: "#ffffff",
        scale: 0.075,
      },
      title: "FontAwesome SVG Marker",
      draggable: true
    });

    setMap(newMap);
    setMarker(newMarker);
    setHeatmap(heatmap);

    //simulateRealTimeUpdates();
    
  }

  const simulateRealTimeUpdates = () => {
    setInterval(() => {
      if (marker) {
        const randomLatOffset = Math.random() * 0.01;
        const randomLngOffset = Math.random() * 0.01;
        const newLocation = {
          lat: newMarker.getPosition().lat() + randomLatOffset,
          lng: newMarker.getPosition().lng() + randomLngOffset,
        };
  
        newMarker.setPosition(newLocation);
      }
    }, 1000)
  };

  function toggleHeatmap() {
    if (heatmap) {
      heatmap.setMap(heatmap.getMap() ? null : map);
    }
  }

  function changeGradient() {
    if (heatmap) {
      const gradient = [
        "rgba(0, 255, 255, 0)",
        "rgba(0, 255, 255, 1)",
        "rgba(0, 191, 255, 1)",
        "rgba(0, 127, 255, 1)",
        "rgba(0, 63, 255, 1)",
        "rgba(0, 0, 255, 1)",
        "rgba(0, 0, 223, 1)",
        "rgba(0, 0, 191, 1)",
        "rgba(0, 0, 159, 1)",
        "rgba(0, 0, 127, 1)",
        "rgba(63, 0, 91, 1)",
        "rgba(127, 0, 63, 1)",
        "rgba(191, 0, 31, 1)",
        "rgba(255, 0, 0, 1)",
      ];
      heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
    }
  }

  function changeRadius() {
    if (heatmap) {
      heatmap.set('radius', heatmap.get('radius') ? null : 20);
    }
  }

  function changeOpacity() {
    if (heatmap) {
      heatmap.set('opacity', heatmap.get('opacity') ? null : 0.2);
    }
  }
  

  return (
    <div>
      <Button id="toggle-heatmap" variant="contained" color="primary" onClick={toggleHeatmap}>Toggle Heatmap</Button>
      <Button id="change-gradient" variant="contained" color="primary" onClick={changeGradient}>Change gradient</Button>
      <Button id="change-radius" variant="contained" color="primary" onClick={changeRadius}>Change radius</Button>
      <Button id="change-opacity" variant="contained" color="primary" onClick={changeOpacity}>Change opacity</Button>
      <div id="map" style={{ height: '1000px', width: '100%' }}></div>
    </div>
  );
}

export default React.memo(Map);
