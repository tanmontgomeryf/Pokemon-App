import React from 'react';
import { connect } from 'react-redux';
import { deletePokemon } from '../../redux';
import { checkPokemon } from '../../helpers';
import Nickname from '../Forms/Nickname';
import TrainerPokemonPowerLevel from './TrainerPokemonPowerLevel';

const TrainerPokemon = ({
  pokemon: { pokemonDetails, nickname, _id },
  isAuthenticated,
  currentUser,
  paramsUserId,
  deletePokemon,
}) => {
  const { types, name, stats } = pokemonDetails;
  const baseStats = [...stats].reduce(
    (accumulator, currentValue) => accumulator + currentValue.base_stat,
    0
  );
  const handleDelete = () => {
    deletePokemon(currentUser._id, _id);
  };
  return (
    <div className='TrainerPokemon'>
      {isAuthenticated && currentUser._id === paramsUserId && (
        <button className='TrainerPokemon-delete' onClick={handleDelete}>
          x
        </button>
      )}
      <div className='TrainerPokemon-img'>
        <img
          src={`https://img.pokemondb.net/sprites/home/normal/${checkPokemon(
            name
          )}.png`}
          alt={name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              'https://cdn.bulbagarden.net/upload/a/a1/Substitute_artwork.png';
          }}
        />
      </div>
      <div className='TrainerPokemon-info'>
        <div>
          <p>Nickname:</p>
          {isAuthenticated && currentUser._id === paramsUserId ? (
            <Nickname
              nickname={checkPokemon(nickname)}
              pokemonId={_id}
              currentUserId={currentUser._id}
            />
          ) : (
            <h4>{checkPokemon(nickname)}</h4>
          )}
        </div>

        <div className='TrainerPokemon-infoTypes'>
          {types.map((type) => (
            <div
              className={`types type-${type.type.name}`}
              key={type.type.name}
            >
              {type.type.name}
            </div>
          ))}
        </div>
      </div>
      <div className='TrainerPokemon-infoPL'>
        <p>Base Stat Total: {baseStats}</p>
        <TrainerPokemonPowerLevel baseStats={baseStats} />
      </div>
    </div>
  );
};

export default connect(null, { deletePokemon })(TrainerPokemon);
