import React, { Fragment } from 'react';

const PokemonEvoChain = ({ evolutionChain, id }) => {
  return (
    <Fragment>
      <h4>Evolution</h4>
      {evolutionChain.map((evo) => (
        <div key={evo.id}>
          <img
            src={`https://img.pokemondb.net/sprites/home/normal/${evo.name}.png`}
            alt={evo.name}
          />
          <p>
            {evo.name} #{evo.id ? evo.id : id}
          </p>
        </div>
      ))}
    </Fragment>
  );
};

export default PokemonEvoChain;
