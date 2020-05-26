import React from 'react';
import { connect } from 'react-redux';
import { deletePokemon } from '../../redux';
import { checkPokemon } from '../../helpers';
import Nickname from '../Forms/Nickname';

const TrainerPokemon = ({
  pokemon: { pokemonDetails, nickname, _id },
  isAuthenticated,
  currentUser,
  paramsUserId,
  deletePokemon,
}) => {
  const { types, name } = pokemonDetails;
  const handleDelete = () => {
    deletePokemon(currentUser._id, _id);
  };
  return (
    <div>
      <div>
        {isAuthenticated && currentUser._id === paramsUserId && (
          <button onClick={handleDelete}>x</button>
        )}
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
          className='PokedexItem-img'
        />
      </div>
      <div>
        {isAuthenticated && currentUser._id === paramsUserId ? (
          <Nickname
            nickname={nickname}
            pokemonId={_id}
            currentUserId={currentUser._id}
          />
        ) : (
          <h4>{nickname}</h4>
        )}

        {types.map((type) => (
          <div className={`types type-${type.type.name}`} key={type.type.name}>
            {type.type.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default connect(null, { deletePokemon })(TrainerPokemon);
