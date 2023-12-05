import React, { useState, useEffect } from 'react';

const API_KEY = "bb9290993d26a1fb4a242c25f99f253e"

const WeatherApp = ({latitude, longitude}) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const API_URL = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`

    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };
 
    fetchData();
  }, []);

  return (
    <div>
      {weatherData ? (
        <div>
          <h3>Timezone: {weatherData.timezone}</h3>
          <p>Temperature: {(weatherData.current.temp - 273.15).toFixed(2)}°C</p>
          <p>Humidity: {weatherData.current.humidity} g * kg-1</p>
          <p>Pressure: {weatherData.current.pressure} mbar</p>
          {/* Add more details as needed */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default WeatherApp;
