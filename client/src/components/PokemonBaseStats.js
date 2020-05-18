import React, { Fragment } from 'react';

const PokemonBaseStats = ({ totalPokeStats }) => {
  return (
    <Fragment>
      <h4>Base Stats</h4>
      {totalPokeStats.map((stat) => (
        <p key={stat.name}>
          <strong>{stat.name}:</strong> {stat.baseStat}
        </p>
      ))}
    </Fragment>
  );
};

export default PokemonBaseStats;
