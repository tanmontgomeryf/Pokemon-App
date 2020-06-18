import React from 'react';
import { Link } from 'react-router-dom';
import { addDefaultTeam, totalTeamPower, checkPokemon } from '../../helpers';

const TrainersItem = ({ user }) => {
  return (
    <div className='TrainersItem'>
      <Link to={`/trainer/${user._id}`}>
        <div className='TrainersItem-items'>
          <h4>
            Trainer: <span>{user.username}</span>
          </h4>
          <h4>
            Team Power Level: <span>{totalTeamPower(user.pokemonTeam)}</span>
          </h4>
          <div className='TrainersItem-pokemonTeam'>
            {addDefaultTeam(user.pokemonTeam).map((pokemon, i) =>
              pokemon.defaultPokemon ? (
                <div key={i} className='TrainersItem-pokemon'>
                  <img
                    src='https://cdn.bulbagarden.net/upload/a/a1/Substitute_artwork.png'
                    alt=''
                  />
                  <p>???</p>
                </div>
              ) : (
                <div key={pokemon._id} className='TrainersItem-pokemon'>
                  <img
                    src={`https://img.pokemondb.net/sprites/home/normal/${checkPokemon(
                      pokemon.pokemonDetails.name
                    ).toLowerCase()}.png`}
                    alt={pokemon.pokemonDetails.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        'https://cdn.bulbagarden.net/upload/a/a1/Substitute_artwork.png';
                    }}
                  />
                  <p>{checkPokemon(pokemon.nickname)}</p>
                  <div className='TrainersItem-typesDiv'>
                    {pokemon.pokemonDetails.types.map((type) => (
                      <div
                        className={`TrainersItem-types type-${type.type.name}`}
                        key={type.type.name}
                      >
                        <p>{type.type.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TrainersItem;
