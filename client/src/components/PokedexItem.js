import React from 'react';
import { Link } from 'react-router-dom';

const PokedexItem = ({ pokemon: { name, id } }) => {
  return (
    <div>
      <Link to={`/${id}`}>
        <img
          src={`https://img.pokemondb.net/sprites/home/normal/${name}.png`}
          alt={name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              'https://cdn.bulbagarden.net/upload/a/a1/Substitute_artwork.png';
          }}
        />
        <h4>{name}</h4>
        <p>{id}</p>
      </Link>
    </div>
  );
};

export default PokedexItem;
