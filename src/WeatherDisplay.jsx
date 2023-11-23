import React, { useState, useEffect } from "react";
import "./WeatherDisplay.css";
import HotelInfo from "./HotelInfo.jsx";

function WeatherDisplay({ city }) {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const apiKey = "LQURf20ejn9kqvDswMdSNsAa4Azm5Pul";

  useEffect(() => {
    if (city) {
      fetch(
        `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${city}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          const cityKey = data[0].Key;
          const lat = data[0].GeoPosition.Latitude;
          const lon = data[0].GeoPosition.Longitude;
          console.log(lat);
          setLatitude(lat);
          setLongitude(lon);
          return fetch(
            `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=${apiKey}`
          );
        })
        .then((response) => response.json())
        .then((data) => setWeatherData(data.DailyForecasts))
        .catch((err) => setError(err));
    }
  }, [city]);

  if (!weatherData) {
    return null;
  }

  const convertToFahrenheit = (fahrenheit) => {
    return ((fahrenheit - 32) * 5) / 9;
  };
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  return (
    <div>
      <div className="weather-display">
        <h2>Pronóstico para los próximos 5 días</h2>
        <ul className="weather-list">
          {weatherData.map((day, index) => (
            <li key={index} className="weather-item">
              <p> {formatDate(day.Date)}</p>
              <p>
                Máxima:{" "}
                {convertToFahrenheit(day.Temperature.Maximum.Value).toFixed(1)}
                °C
              </p>
              <p>
                Mínima:{" "}
                {convertToFahrenheit(day.Temperature.Minimum.Value).toFixed(1)}
                °C
              </p>
              <p>Descripción: {day.Day.IconPhrase}</p>
            </li>
          ))}
        </ul>
      </div>
      {latitude && longitude ? (
        <HotelInfo lat={latitude} lon={longitude} />
      ) : null}
    </div>
  );
}

export default WeatherDisplay;
