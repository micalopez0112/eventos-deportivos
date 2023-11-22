import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Importa useParams de react-router-dom
import WeatherDisplay from "./WeatherDisplay.jsx";
import "./FixtureDetails.css";

const FixtureDetails = ({ match }) => {
  const { matchId } = useParams();
  const [fixtureDetails, setFixtureDetails] = useState(null);

  useEffect(() => {
    console.log("id: " + matchId);

    // const fixtureId = match.params.matchId;
    const apiKey = "4d3a4c59edbef5e39c58a68f3ae328c7"; // Reemplaza con tu propia API key
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
        // console.log(data.response[0]);
      })
      .catch((error) => {
        console.error("Error al obtener los detalles del fixture: ", error);
      });
  }, [matchId]);

  if (!fixtureDetails) {
    return <div>Cargando detalles del fixture...</div>;
  }
  if (fixtureDetails) {
    console.log(fixtureDetails);
  }

  return (
    <div>
      <div className="fixture-container">
        <h2>Detalles del Fixture Seleccionado</h2>
        <div className="teams-container">
          <div className="team-container">
            <img
              src={fixtureDetails.teams.home.logo}
              alt={fixtureDetails.teams.home.logo}
              className="team-logo"
            />
            <p className="team-name">{fixtureDetails.teams.home.name}</p>
          </div>
          <p className="event-teams">vs</p>
          <div className="team-container">
            <img
              src={fixtureDetails.teams.away.logo}
              alt={fixtureDetails.teams.away.logo}
              className="team-logo"
            />
            <p className="team-name">{fixtureDetails.teams.away.name}</p>
          </div>
        </div>
        <p className="">
          {" "}
          <strong>Fecha:</strong>{" "}
          {new Date(fixtureDetails.fixture.date).toLocaleString()}{" "}
        </p>
        <p className="">
          {" "}
          <strong>Estadio:</strong> {fixtureDetails.fixture.venue.name},{" "}
          {fixtureDetails.fixture.venue.city}
        </p>
        <p className="detail">
          <strong>Árbitro:</strong> {fixtureDetails.fixture.referee}
        </p>
        <p className="detail">
          <strong>Estado:</strong> {fixtureDetails.fixture.status.long}
        </p>
        <p className="detail">
          <strong>Liga:</strong> {fixtureDetails.league.name} -{" "}
          {fixtureDetails.league.country}
        </p>
      </div>
      <WeatherDisplay city={fixtureDetails.fixture.venue.city} />
    </div>
  );
};

export default FixtureDetails;
