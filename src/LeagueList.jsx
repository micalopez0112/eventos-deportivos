import React, { useState, useEffect } from "react";
import "./LeagueList.css";
import { Link } from "react-router-dom";

const LeagueList = () => {
  const [leagues, setLeagues] = useState([]);
  const [visibleLeagues, setVisibleLeagues] = useState(10); // Número inicial de ligas visibles
  const [increment, setIncrement] = useState(10); // Incremento para cargar más ligas
  const [hasMore, setHasMore] = useState(true); // Estado para controlar si hay más ligas para cargar

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const apiKey = "4d3a4c59edbef5e39c58a68f3ae328c7"; // Reemplaza 'TU_API_KEY' con tu clave de API de API-Sports
        const response = await fetch(
          "https://v3.football.api-sports.io/leagues",
          {
            method: "GET",
            headers: {
              "x-rapidapi-host": "v3.football.api-sports.io",
              "x-rapidapi-key": apiKey,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setLeagues(data.response);
        } else {
          console.error("Error al obtener datos de la API");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchLeagues();
    console.log(leagues);
  }, []);

  const loadMoreLeagues = () => {
    const nextVisibleLeagues = visibleLeagues + increment;
    if (nextVisibleLeagues >= leagues.length) {
      setVisibleLeagues(leagues.length);
      setHasMore(false);
    } else {
      setVisibleLeagues(nextVisibleLeagues);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Ligas de Fútbol</h1>
      <ul>
        {leagues.slice(0, visibleLeagues).map((league, index) => (
          <Link to={`/ligas/${league.league.id}`} className="item">
            <li key={index} className="league-item">
              <img
                src={league.league.logo}
                alt={league.league.name}
                className="logo"
              />
              <strong>Nombre:</strong> {league.league.name} -{" "}
              <strong>Tipo:</strong> {league.league.type} <strong>País:</strong>{" "}
              {league.country.name}
            </li>
          </Link>
        ))}
      </ul>
      {hasMore && (
        <button onClick={loadMoreLeagues} className="load-more">
          Ver más ligas
        </button>
      )}
    </div>
  );
};

export default LeagueList;
