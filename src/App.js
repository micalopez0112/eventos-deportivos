import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FootballEvents from "./FootballEvents.jsx";
import LeagueList from "./LeagueList.jsx";
import FixtureDetails from "./FixtureDetails.jsx";
import HotelInfo from "./HotelInfo.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/ligas" element={<LeagueList />} />
        <Route path="/ligas/:id" element={<FootballEvents />} />
        <Route
          path="/ligas/:id/details/:matchId"
          element={<FixtureDetails />}
        />
        <Route path="/hotels" element={<HotelInfo />} />
      </Routes>
    </Router>
  );
}

export default App;
