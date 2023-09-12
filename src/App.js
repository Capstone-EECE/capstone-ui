
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";
import "./App.css";
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const App = () => {
  const [latitude, setLatitude] = useState(42.339162);
  const [longitude, setLongitude] = useState(-71.088117);
  const [mapCenter, setMapCenter] = useState({ lat: latitude, lng: longitude });
  const temp = useState(useMemo(() => ({ lat: latitude, lng: longitude }), []))
  //const [center, setCenter] = useState(temp)


  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  }); 


    // Event handler for input1
    const handleInput1Change = (event) => {
      setLatitude(parseFloat(event.target.value));
    };
  
    // Event handler for input2
    const handleInput2Change = (event) => {
      setLongitude(parseFloat(event.target.value));
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      
      // Do something with the input values
      console.log('Latitude:', latitude);
      console.log('Lognitude:', longitude);
      setMapCenter({ lat: latitude, lng: longitude });
      
    };

  return (

    <div className="App">
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            label="Latitude"
            variant="outlined"
            fullWidth
            value={latitude}
            onChange={handleInput1Change}
          />
        </div>
        <div>
          <TextField
            label="Longitude"
            variant="outlined"
            fullWidth
            value={longitude}
            onChange={handleInput2Change}
          />
        </div>
        <div>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </div>
      </form>
    <div className="google-container">
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName="map-container"
          center={mapCenter}
          zoom={10}
        >
          <Marker position={{ lat: latitude, lng: longitude }} />
        </GoogleMap>
      )}

    </div>
    </div>
  );
};

export default App;