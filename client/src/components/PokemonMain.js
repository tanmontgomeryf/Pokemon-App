import React, { Fragment } from 'react';

const PokemonMain = ({
  pokemon: { name, padID, types, abilities, weight, height },
}) => {
  return (
    <Fragment>
      <div>
        <img
          src={`https://img.pokemondb.net/artwork/large/${name}.jpg`}
          alt={name}
        />
      </div>

      <div>
        <h4>{name}</h4>
        <p>National No.: #{padID}</p>
        <p>Type: </p>
        {types.map((type) => (
          <p key={type.type.name}>{type.type.name}</p>
        ))}
        {abilities.map((ability) => (
          <div key={ability.ability}>
            <h4>{ability.ability}</h4>
            <p>{ability.description}</p>
          </div>
        ))}
        <p>weight: {weight}</p>
        <p>height: {height}</p>
      </div>
    </Fragment>
  );
};

export default PokemonMain;
