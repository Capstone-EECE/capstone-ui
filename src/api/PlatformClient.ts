import axios from 'axios';
import { config } from "../config";

class PlatformClient {
  private apiUrl: string;
  
  constructor() {
    this.apiUrl = config.apiUrl
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