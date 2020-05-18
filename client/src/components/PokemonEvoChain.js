import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { padZeros, cleanEvolutionChain } from '../helpers';

const PokemonEvoChain = ({ evolutionChain: { chain }, id }) => {
  return (
    <Fragment>
      <h4>Evolution</h4>
      {cleanEvolutionChain(chain).map((evo) => (
        <Link key={evo.id} to={`/${evo.id}`}>
          <img
            src={`https://img.pokemondb.net/sprites/home/normal/${evo.name}.png`}
            alt={evo.name}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                'https://cdn.bulbagarden.net/upload/a/a1/Substitute_artwork.png';
            }}
          />
          <p>
            {evo.name} #{evo.id ? padZeros(evo.id, -3) : id}
          </p>
        </Link>
      ))}
    </Fragment>
  );
};

export default PokemonEvoChain;
