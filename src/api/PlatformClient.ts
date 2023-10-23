import axios from 'axios';
import { config } from "../config";
import io, { Socket } from 'socket.io-client';
import { DefaultEventsMap } from '@socket.io/component-emitter';

class PlatformClient {
  private apiUrl: string;
  private socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  
  constructor() {
    this.apiUrl = config.apiUrl
    this.socket = io(`${config.apiUrl}/drone`)
  }


  /**
   * Start listening to drone location updates
   * @param {function} callback - A function to handle the incoming location updates
   */
  async listenToDroneLocationUpdates(callback: (arg0: any) => void) {
    console.log(`${config.apiUrl}/drone`)
    console.log(this.socket)
    this.socket.on('gpsUpdate', (coordinates) => {
      // Call the provided callback with the updated coordinates
      callback(coordinates);
    });
  }

  /**
   * Stop listening to drone location updates
   */
  async stopListeningToDroneLocationUpdates() {
      this.socket.off('gpsUpdate');
  }

  /**
   * [GET] the thickness for the current location 
   */
  async getThickness(longitude: string, latitude: string) {

    return await this.fetchData('capstone/points')
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