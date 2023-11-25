import React, { useEffect, useState } from "react";
import "./HotelInfo.css";

const HotelInfo = ({ lat, lon }) => {
  console.log(lat);
  const [hotels, setHotels] = useState([]);
  const [apiToken, setApiToken] = useState("");
  const [visibleHotels, setVisibleHotels] = useState(10);
  const LATITUDE = "41.397158";
  const LONGITUDE = "2.160873";

  const API_KEY = "N9dqGUr3XJU1Ac2C88eaJAVLMrCSL4zg";
  const API_SECRET = "4OtjVkzFmyVhmnFA";

  useEffect(() => {
    const getToken = async () => {
      try {
        const response = await fetch(
          "https://test.api.amadeus.com/v1/security/oauth2/token",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `grant_type=client_credentials&client_id=${API_KEY}&client_secret=${API_SECRET}`,
          }
        );

        if (!response.ok) {
          throw new Error("Error al obtener el token");
        }

        const data = await response.json();
        setApiToken(data.access_token);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    getToken();
  }, []);

  const searchHotelsByGeocode = async () => {
    try {
      const response = await fetch(
        `https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-geocode?latitude=${lat}&longitude=${lon}`,
        {
          headers: {
            Authorization: `Bearer ${apiToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al buscar hoteles por geocode");
      }

      const data = await response.json();
      setHotels(data.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (apiToken) {
      searchHotelsByGeocode();
    }
  }, [apiToken]);

  const showMoreHotels = () => {
    setVisibleHotels(visibleHotels + 10);
  };

  return (
    <div className="hotel-container">
      {" "}
      <h1>Hoteles cercanos</h1>
      <ul className="hotel-list">
        {" "}
        {hotels.slice(0, visibleHotels).map((hotel, index) => (
          <li key={index} className="hotel-item">
            <div>{hotel.name}</div>
            <div>
              {hotel.address.countryCode}, {hotel.iataCode}
            </div>
          </li>
        ))}
      </ul>
      {visibleHotels < hotels.length && (
        <button onClick={showMoreHotels} className="load-more">
          Ver más
        </button>
      )}
    </div>
  );
};

export default HotelInfo;
