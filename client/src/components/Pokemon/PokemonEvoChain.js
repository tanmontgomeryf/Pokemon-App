import React from 'react';
import { Link } from 'react-router-dom';
import {
  cleanEvolutionChain,
  checkPokemon,
  checkPokemonForLink,
} from '../../helpers';

const PokemonEvoChain = ({ evolutionChain: { chain }, idOrName }) => {
  return (
    <div className='PokemonEvoChain'>
      <h4>Evolution:</h4>
      <div className='PokemonEvoChain-group'>
        {cleanEvolutionChain(chain).map((evo) => (
          <Link
            key={evo.id}
            to={
              idOrName === checkPokemon(evo.name) || idOrName === evo.id
                ? '#'
                : `/${evo.id}`
            }
          >
            <div>
              <img
                src={`https://img.pokemondb.net/sprites/home/normal/${checkPokemonForLink(
                  evo.name
                )}.png`}
                alt={checkPokemon(evo.name)}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    'https://cdn.bulbagarden.net/upload/a/a1/Substitute_artwork.png';
                }}
              />
              <p>{checkPokemon(evo.name)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PokemonEvoChain;
