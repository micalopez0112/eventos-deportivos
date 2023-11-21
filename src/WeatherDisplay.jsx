import React, { useState, useEffect } from "react";

function WeatherDisplay({ city }) {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = "LQURf20ejn9kqvDswMdSNsAa4Azm5Pul";

  useEffect(() => {
    if (city) {
      fetch(
        `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${"montevideo"}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          const cityKey = data[0].Key;
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

  return (
    <div className="weather-display">
      <h2>Pronóstico para los próximos 5 días</h2>
      <ul>
        {weatherData.map((day, index) => (
          <li key={index}>
            <p>Fecha: {day.Date}</p>
            <p>
              Máxima:{" "}
              {convertToFahrenheit(day.Temperature.Maximum.Value).toFixed(1)}°C
            </p>
            <p>
              Mínima:{" "}
              {convertToFahrenheit(day.Temperature.Minimum.Value).toFixed(1)}°C
            </p>
            <p>Descripción: {day.Day.LongPhrase}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WeatherDisplay;
