import React, { useEffect, useState } from "react";
import "./HotelInfo.css";

const HotelInfo = ({ lat, lon }) => {
  console.log(lat);
  const [hotels, setHotels] = useState([]);
  const [apiToken, setApiToken] = useState("");
  const [visibleHotels, setVisibleHotels] = useState(10); // Variable de estado para controlar la cantidad de hoteles a mostrar
  const LATITUDE = "41.397158"; // Reemplaza con la latitud
  const LONGITUDE = "2.160873"; // Reemplaza con la longitud

  const API_KEY = "N9dqGUr3XJU1Ac2C88eaJAVLMrCSL4zg"; // Reemplaza con tu API Key
  const API_SECRET = "4OtjVkzFmyVhmnFA"; // Reemplaza con tu API Secret

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
      setHotels(data.data); // Actualizar el estado con los datos de hoteles
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
    setVisibleHotels(visibleHotels + 10); // Mostrar 10 hoteles adicionales al hacer clic en "Ver más"
  };

  return (
    <div className="hotel-container">
      {" "}
      {/* Agrega una clase al contenedor principal */}
      <h1>List of Hotels</h1>
      <ul className="hotel-list">
        {" "}
        {/* Agrega una clase a la lista */}
        {hotels.slice(0, visibleHotels).map((hotel, index) => (
          <li key={index} className="hotel-item">
            <div>{hotel.name}</div>
            <div>
              {hotel.address.countryCode}, {hotel.iataCode}
            </div>
            {/* Agrega una clase a cada elemento de hotel */}

            {/* Ajusta las propiedades según la estructura real */}
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
