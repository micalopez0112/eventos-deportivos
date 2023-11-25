import React, { useState, useEffect } from "react";
import "./FootballEvents.css";
import { useParams, Link } from "react-router-dom";

const SoccerEvents = () => {
  const { id } = useParams();
  const [leagueDetails, setLeagueDetails] = useState(null);
  const [visibleEvents, setVisibleEvents] = useState(10);

  useEffect(() => {
    const apiKey = "4d3a4c59edbef5e39c58a68f3ae328c7";
    const apiUrl = `https://v3.football.api-sports.io/fixtures?season=2023&league=${id}&status=NS`;

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
        setLeagueDetails(data.response);
      })
      .catch((error) => {
        console.error("Error al obtener los partidos: ", error);
      });
  }, []);

  if (!leagueDetails) {
    return <div>Cargando detalles de la liga...</div>;
  }

  const loadMoreEvents = () => {
    setVisibleEvents(visibleEvents + 10);
  };

  return (
    <div className="container">
      <h1>Detalles de la Liga</h1>
      <ul className="event-list">
        {leagueDetails.slice(0, visibleEvents).map((match) => (
          <Link
            to={`/ligas/${id}/details/${match.fixture.id}`}
            className="match-link"
          >
            <li key={match.fixture.id} className="event-item">
              <div className="teams-container">
                <div className="team-container">
                  <img
                    src={match.teams.home.logo}
                    alt={match.teams.home.logo}
                    className="team-logo"
                  />
                  <p className="team-name">{match.teams.home.name}</p>
                </div>
                <p className="event-teams">vs</p>
                <div className="team-container">
                  <img
                    src={match.teams.away.logo}
                    alt={match.teams.away.logo}
                    className="team-logo"
                  />
                  <p className="team-name">{match.teams.away.name}</p>
                </div>
              </div>
              <p className="event-time">
                {" "}
                Fecha: {new Date(match.fixture.date).toLocaleString()}{" "}
              </p>
              <p className="event-location">
                {" "}
                Lugar: {match.fixture.venue.name}, {match.fixture.venue.city}
              </p>
            </li>
          </Link>
        ))}
      </ul>
      {visibleEvents < leagueDetails.length && (
        <button className="load-more" onClick={loadMoreEvents}>
          Cargar más
        </button>
      )}
    </div>
  );
};

export default SoccerEvents;
