import React from 'react';
import {
  padZeros,
  addPeriod,
  cleanAbilities,
  checkPokemon,
  checkPokemonForLink,
} from '../../helpers';

const PokemonMain = ({
  pokemon: { name, id, types, abilities, abilityDescriptions, weight, height },
}) => {
  return (
    <div className='PokemonMain'>
      <img
        src={`https://img.pokemondb.net/artwork/large/${checkPokemonForLink(
          name
        )}.jpg`}
        alt={checkPokemon(name)}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =
            'https://cdn.bulbagarden.net/upload/a/a1/Substitute_artwork.png';
        }}
        className='PokemonMain-img'
      />

      <div className='PokemonMain-info'>
        <h4>National Pokedex</h4>
        <h4>{checkPokemon(name)}</h4>
        <p>National No.: #{padZeros(id, -3)}</p>
        <div className='PokemonMain-types'>
          <p>Type: </p>
          {types.map((type) => (
            <div
              className={`types type-${type.type.name}`}
              key={type.type.name}
            >
              {type.type.name}
            </div>
          ))}
        </div>
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
    </div>
  );
};

export default PokemonMain;
