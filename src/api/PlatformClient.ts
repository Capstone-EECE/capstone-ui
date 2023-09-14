import axios from 'axios';
import { config } from "../config";

class PlatformClient {
  private apiUrl;
  
  constructor() {
    this.apiUrl = config.apiUrl
  }


  /**
   * STUBS
   */
  async getDroneLocation() {}

  /**
   * STUBS
   */
  async requestReading() {}

  /**
   * STUBS
   */
  async getThickness(longitude: string, latitude: string) {}


  async fetchData(endpoint: string, queryParams = {}) {
    try {
        console.log(`${this.apiUrl}/${endpoint}`)
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