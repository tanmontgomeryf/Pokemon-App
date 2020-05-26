import React from 'react';
import { Link } from 'react-router-dom';
import { padZeros, checkPokemon } from '../../helpers';

const PokedexItem = ({ pokemon: { name, id } }) => {
  return (
    <div className='PokedexItem-item'>
      <Link to={`/${id}`}>
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
        <h4 className='PokedexItem-title'>
          <span className='PokedexItem-name'>{checkPokemon(name)}</span>{' '}
          <span className='PokedexItem-number'>#{padZeros(id, -3)}</span>
        </h4>
      </Link>
    </div>
  );
};

export default PokedexItem;
