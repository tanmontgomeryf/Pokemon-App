import React, { Fragment } from 'react';
import { padZeros, addPeriod, cleanAbilities } from '../helpers';

const PokemonMain = ({
  pokemon: { name, id, types, abilities, abilityDescriptions, weight, height },
}) => {
  return (
    <Fragment>
      <div>
        <img
          src={`https://img.pokemondb.net/artwork/large/${name}.jpg`}
          alt={name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              'https://cdn.bulbagarden.net/upload/a/a1/Substitute_artwork.png';
          }}
        />
      </div>

      <div>
        <h4>{name}</h4>
        <p>National No.: #{padZeros(id, -3)}</p>
        <p>Type: </p>
        {types.map((type) => (
          <p key={type.type.name}>{type.type.name}</p>
        ))}
        {cleanAbilities(abilities, abilityDescriptions)
          .reverse()
          .map((ability) => (
            <div key={ability.ability}>
              <h4>{ability.ability}</h4>
              <p>{ability.description}</p>
            </div>
          ))}
        <p>weight: {`${addPeriod(weight)} kg`}</p>
        <p>height: {`${addPeriod(height)} m`}</p>
      </div>
    </Fragment>
  );
};

export default PokemonMain;
