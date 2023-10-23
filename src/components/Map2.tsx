// eslint-disable-next-line react-hooks/exhaustive-deps
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import * as d3 from 'd3'

function Map({ latitude, longitude, points, droneLocation }) {
  const [map, setMap] = useState(null);
  const [heatmap, setHeatmap] = useState(null);

  useEffect(() => {
    if (window.google) {
      initializeMap();
    }
  }, [latitude, longitude, points, droneLocation]);

  function initializeMap() {
    let map = new window.google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: { lat: latitude, lng: longitude },
    });

    let heatmap = new window.google.maps.visualization.HeatmapLayer({
      data: points? points : [],
      map: map,
    });

    setMap(map);
    setHeatmap(heatmap);

    const overlay = new window.google.maps.OverlayView();
    overlay.onAdd = addOverlay;
    overlay.draw = drawOverlay;
    overlay.setMap(map);
  }

  function addOverlay() {
    const layer = d3.select(this.getPanes().overlayLayer).append('div').attr('class', 'overlay');
    layer.append('img').attr('src', '/drone.png').style('width', '75px').style('height', '75px');
  }

  function drawOverlay() {
    const projection = this.getProjection();
    const pixel = projection.fromLatLngToDivPixel(new window.google.maps.LatLng(latitude, longitude));
    const img = d3.select('.overlay img');
    img.style('left', pixel.x - 25 + 'px').style('top', pixel.y - 25 + 'px');
  }

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
      <div id="map" style={{ height: '600px', width: '100%' }}></div>
      <Button id="toggle-heatmap" variant="contained" color="primary" onClick={toggleHeatmap}>Toggle Heatmap</Button>
      <Button id="change-gradient" variant="contained" color="primary" onClick={changeGradient}>Change gradient</Button>
      <Button id="change-radius" variant="contained" color="primary" onClick={changeRadius}>Change radius</Button>
      <Button id="change-opacity" variant="contained" color="primary" onClick={changeOpacity}>Change opacity</Button>
    </div>
  );
}

export default Map;
