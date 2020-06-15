import React, { Fragment } from 'react';

const PokemonDescriptionItemA = ({ description, handleToggle, toggle }) => {
  return (
    <Fragment>
      <p
        className={`PokemonDescription-title ${toggle ? null : 'active'}`}
        onClick={toggle ? handleToggle : null}
      >
        {description.version.replace(/-/g, ' ')}
      </p>
      <div
        className={`PokemonDescription-description ${toggle ? 'close' : null}`}
      >
        <p>{description.description}</p>
      </div>
    </Fragment>
  );
};

export default PokemonDescriptionItemA;
