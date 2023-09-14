import axios from 'axios';

class PlatformClient {
  private apiUrl;
  
  constructor() {
    this.apiUrl = 'http://127.0.0.1:5000' //process.env.BACKEND_PLATFORM_URL
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

      // Extract the response data
      const data = response.data;

      return data;
    } catch (error) {
      console.error("Error:", error);
      throw error; // Propagate the error to the caller
    }
  }
}

export default new PlatformClient()