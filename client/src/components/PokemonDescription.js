import React, { Fragment } from 'react';

const PokemonDescription = ({ description }) => {
  return (
    <Fragment>
      {description.length > 0 &&
        description.map((description) => (
          <div key={description.version}>
            <h4>{description.version}</h4>
            <p>{description.description}</p>
          </div>
        ))}
    </Fragment>
  );
};

export default PokemonDescription;
