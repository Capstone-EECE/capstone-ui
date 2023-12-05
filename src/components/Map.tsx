// eslint-disable-next-line react-hooks/exhaustive-deps
import { Button } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlane } from "@fortawesome/free-solid-svg-icons";
import React from 'react';
import Drone from './Drone'
import Heatmap from './HeatMap';


function Map({ droneConnected, mapCenter }) {
  const mapRef = useRef(null);
  const droneRef = useRef(null)
  const heatmapRef = useRef(null)
  const infowindow = useRef(null)
  

  useEffect(() => {
    if (window.google) {
      initializeMap();
    }
  }, [mapCenter, droneConnected]);

  function initializeMap() {
    mapRef.current = new window.google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: { lat: mapCenter.lat, lng: mapCenter.lng },
    });

    heatmapRef.current = new window.google.maps.visualization.HeatmapLayer({
      data: [],
      map: mapRef.current,
    });

    if (droneConnected) {
      droneRef.current = new window.google.maps.Marker({
        position: { lat: mapCenter.lat, lng: mapCenter.lng },
        map: mapRef.current,
        icon: {
          path: faPlane.icon[4] as string,
          fillColor: "#000000",
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
      
    };
  }

  function changeGradient() {
    if (heatmapRef) {
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
      heatmapRef.current.set('gradient', heatmapRef.current.get('gradient') ? null : gradient);
    }
  }

  function changeRadius() {
    if (heatmapRef) {
      heatmapRef.current.set('radius', heatmapRef.current.get('radius') ? null : 20);
    }
  }

  function changeOpacity() {
    if (heatmapRef) {
      heatmapRef.current.set('opacity', heatmapRef.current.get('opacity') ? null : 0.2);
    }
  }
  

  return (
    <div>
      <Button id="change-gradient" variant="contained" color="primary" onClick={changeGradient}>Change gradient</Button>
      <Button id="change-radius" variant="contained" color="primary" onClick={changeRadius}>Change radius</Button>
      <Button id="change-opacity" variant="contained" color="primary" onClick={changeOpacity}>Change opacity</Button>
      <div id="map" style={{ height: '900px', width: '100%' }}></div>
      {droneConnected? <Drone droneRef={droneRef}/> : null}
      {droneConnected? <Heatmap heatmapRef={heatmapRef} mapRef={mapRef}/> : null}
    </div>
  );
}

export default React.memo(Map);
