import axios from 'axios';
import { config } from "../config";

// TODO: Add device ID in query parameters
class PlatformClient {
  private apiUrl: string;
  
  constructor() {
    this.apiUrl = config.apiUrl + '/dummy'
  }

  /**
   * [GET] Query devices status 
   */
  async connectDrone() {
    return await this.fetchData('connect')
  }

  /**
   * [GET] instantiate GPS coordinate intake.
   */
    async startGPSReading() {

    
      const response = await this.fetchData('gps/start')
    }

    
  
    /**
     * [GET] Stop sensor intake.
     */
    async stopGPSReading() {
  
      return await this.fetchData('gps/stop')
    }
  

  /**
   * [GET] instantiate sensor intake for readings
   */
  async startSensorReading() {
    return await this.fetchData('points/start')
  }

  /**
   * [GET] Stop sensor intake
   */
  async stopSensorReading() {

    return await this.fetchData('points/stop')
  }




  async fetchData(endpoint: string, queryParams = {}) {
    try {
      const response = await axios.get(`${this.apiUrl}/${endpoint}`, {
        params: queryParams,
      });

      // Check if the response is successful (status code 200)
      if (response.status !== 200) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const data = response.data;

      return data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }
}

export const platformClient = new PlatformClient()