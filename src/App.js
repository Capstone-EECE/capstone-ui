import Map from "./components/Map"
import { platformClient } from './api/PlatformClient';
import { Button } from '@mui/material';


const App = () => {

  const handleBackendRequest = async () => {
    try {
    const response = await platformClient.fetchData('capstone')
    console.log(response)
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