import React from 'react';
import Map from "./Map"
import PlatformClient from './api/PlatformClient';
import { Button } from '@mui/material';


const App = () => {

  const handleBackendRequest = async () => {
    try {
    const response = await PlatformClient.fetchData('capstone')
    console.log(response)
    console.log(process.env.BACKEND_PLATFORM_URLPLATFORM_URL)
    } catch(error) {
      console.log(error)
    }


  }
  return (
    <div>
      <Button onClick={handleBackendRequest} type="submit" variant="contained" color="secondary"> CLICK ME </Button>
      <Map/>
    </div>
  );
};

export default App;