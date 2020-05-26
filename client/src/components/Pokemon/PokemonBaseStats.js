import React, { Fragment } from 'react';
import { totalBaseStats } from '../../helpers';

const PokemonBaseStats = ({ stats }) => {
  return (
    <Fragment>
      <h4>Base Stats</h4>
      {totalBaseStats(stats).map((stat) => (
        <p key={stat.name}>
          <strong>{stat.name}:</strong> {stat.baseStat}
        </p>
      ))}
    </Fragment>
  );
};

export default PokemonBaseStats;
