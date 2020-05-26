import React from 'react';
import { Link } from 'react-router-dom';
import { addDefaultTeam } from '../../helpers';

const TrainersItem = ({ user }) => {
  return (
    <Link to={`/trainer/${user._id}`}>
      <h1 key={user._id}>{user.username}</h1>
      <div>
        {addDefaultTeam(user.pokemonTeam).map((pokemon) =>
          pokemon.defaultPokemon ? (
            <div>default pokemon</div>
          ) : (
            <div key={pokemon._id}>
              <h4>{pokemon.nickname}</h4>
              <img
                src={`https://img.pokemondb.net/sprites/home/normal/${pokemon.pokemonDetails.name.toLowerCase()}.png`}
                alt={pokemon.pokemonDetails.name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    'https://cdn.bulbagarden.net/upload/a/a1/Substitute_artwork.png';
                }}
              />
              {pokemon.pokemonDetails.types.map((type) => (
                <div
                  className={`types type-${type.type.name}`}
                  key={type.type.name}
                >
                  {type.type.name}
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </Link>
  );
};

export default TrainersItem;
