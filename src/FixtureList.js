import React from "react";

const FixtureList = ({ fixtures, onFixtureSelect }) => {
  return (
    <div>
      <h2>Lista de Fixtures</h2>
      <ul>
        {fixtures.map((fixture) => (
          <li key={fixture.id} onClick={() => onFixtureSelect(fixture.id)}>
            {fixture.date} - {fixture.timezone} - {fixture.venue}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FixtureList;
