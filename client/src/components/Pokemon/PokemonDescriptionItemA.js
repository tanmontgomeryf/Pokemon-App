import React, { Fragment } from 'react';

const PokemonDescriptionItemA = ({ description, handleToggle, toggle }) => {
  return (
    <Fragment>
      <div className={`PokemonDescription-description`}>
        <p>{description.description}</p>
      </div>
    </Fragment>
  );
};

export default PokemonDescriptionItemA;
