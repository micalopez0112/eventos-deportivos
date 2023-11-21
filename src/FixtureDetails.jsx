import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Importa useParams de react-router-dom
import WeatherDisplay from "./WeatherDisplay.jsx";

const FixtureDetails = ({ match }) => {
  const { matchId } = useParams();
  const [fixtureDetails, setFixtureDetails] = useState(null);

  useEffect(() => {
    console.log("id: " + matchId);

    // const fixtureId = match.params.matchId;
    const apiKey = "b27dc673c244903b14fcb19fd927dd3e"; // Reemplaza con tu propia API key
    const apiUrl = `https://v3.football.api-sports.io/fixtures?id=${matchId}`;
    // console.log(match);
    const requestOptions = {
      method: "GET",
      headers: new Headers({
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": apiKey,
      }),
      redirect: "follow",
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setFixtureDetails(data.response[0]);
      })
      .catch((error) => {
        console.error("Error al obtener los detalles del fixture: ", error);
      });
  }, [matchId]);

  if (!fixtureDetails) {
    return <div>Cargando detalles del fixture...</div>;
  }

  const {
    fixture,
    league,
    teams: { home, away },
    status,
    venue,
  } = fixtureDetails;

  return (
    <div>
      <h2>Detalles del Fixture Seleccionado</h2>
      <p>
        <strong>Fecha:</strong> {fixture.date}
      </p>
      <p>
        <strong>Estadio:</strong> {venue.name}, {venue.city}
      </p>
      <p>
        <strong>Árbitro:</strong> {fixture.referee}
      </p>
      <p>
        <strong>Estado:</strong> {status.long}
      </p>
      <p>
        <strong>Liga:</strong> {league.name} - {league.country}
      </p>
      <div>
        <h3>Equipos:</h3>
        <p>
          <strong>{home.name}:</strong>{" "}
          <img src={home.logo} alt={home.name} width="20" height="20" />
        </p>
        <p>
          <strong>{away.name}:</strong>{" "}
          <img src={away.logo} alt={away.name} width="20" height="20" />
        </p>
      </div>
      <WeatherDisplay city={venue.city} />
    </div>
  );
};

export default FixtureDetails;
