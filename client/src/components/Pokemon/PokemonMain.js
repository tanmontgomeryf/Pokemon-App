import React from 'react';
import {
  padZeros,
  addPeriod,
  checkPokemon,
  checkPokemonForLink,
  pokemonSpeciesEn,
} from '../../helpers';
import PokemonMainAbilities from './PokemonMainAbilities';
import { cleanAbilities } from '../../helpers';

const PokemonMain = ({
  pokemon: {
    name,
    id,
    types,
    weight,
    height,
    abilities,
    abilityDescriptions,
    pokemonSpecies,
  },
}) => {
  return (
    <div className='PokemonMain'>
      <div className='PokemonMain-img'>
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
      </div>
      <div className='PokemonMain-info'>
        <h4 className='PokemonMain-infoName'>
          {padZeros(id, -3)} {checkPokemon(name)}
        </h4>
        <div className='PokemonMain-types'>
          <h4>Type: </h4>
          {types.map((type) => (
            <div
              className={`types type-${type.type.name}`}
              key={type.type.name}
            >
              {type.type.name}
            </div>
          ))}
        </div>
        <div className='PokemonMain-species'>
          <h4>Species:</h4>
          <p>{pokemonSpeciesEn(pokemonSpecies).genus}</p>
        </div>
        <div className='PokemonMain-htwt'>
          <div className='PokemonMain-wt'>
            <h4>Weight: </h4>
            <p>{`${addPeriod(weight)} kg`}</p>
          </div>
          <div className='PokemonMain-ht'>
            <h4>Height: </h4>
            <p>{`${addPeriod(height)} m`}</p>
          </div>
        </div>
        <div className='PokemonMain-abilitiesGroup'>
          <h4>Abilities:</h4>
          <div className='PokemonMain-ability'>
            {cleanAbilities(abilities, abilityDescriptions).map((ability) => (
              <PokemonMainAbilities
                ability={ability.ability}
                description={ability.description}
                key={ability.ability}
                is_hidden={ability.is_hidden}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonMain;
