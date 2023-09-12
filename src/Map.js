
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './Map.css';

  

const Map = () => {
  const [latitude, setLatitude] = useState(42.339162);
  const [longitude, setLongitude] = useState(-71.088117);
  const [mapCenter, setMapCenter] = useState({ lat: latitude, lng: longitude });


  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  }); 

    const handleLatitudeChange = (event) => {
        const inputValue = event.target.value;
        const formattedInput = inputValue.replace(/[^-0-9.]/g, '');
        setLatitude(formattedInput);

    };

    const handleLongitudeChange = (event) => {
        const inputValue = event.target.value;
        const formattedInput = inputValue.replace(/[^-0-9.]/g, '');
        setLongitude(formattedInput);
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      
      // Do something with the input values
      console.log('Latitude:', latitude);
      console.log('Longitude:', longitude);
      setMapCenter({ lat: parseFloat(latitude), lng: parseFloat(longitude) });
      
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
            onChange={handleLatitudeChange}
          />
        </div>
        <div>
          <TextField
            label="Longitude"
            variant="outlined"
            fullWidth
            value={longitude}
            onChange={handleLongitudeChange}
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
          <Marker position={{ lat: parseFloat(latitude), lng: parseFloat(longitude) }} />
        </GoogleMap>
      )}

    </div>
    </div>
  );
};

export default Map;