import React, { Fragment } from 'react';

const PokemonDescriptionItemB = ({ description, handleToggle, toggle }) => {
  return (
    <Fragment>
      <p
        className={`PokemonDescription-title alignLeft ${
          toggle ? 'active' : null
        }`}
        onClick={toggle ? null : handleToggle}
      >
        {description.version.replace(/-/g, ' ')}
      </p>
      <div
        className={`PokemonDescription-description ${toggle ? null : 'close'}`}
      >
        <p>{description.description}</p>
      </div>
    </Fragment>
  );
};

export default PokemonDescriptionItemB;
