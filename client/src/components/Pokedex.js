import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchPokedex, fetchMorePokedex } from '../redux';
import PokedexItem from './PokedexItem';

const Pokedex = ({ pokemon: { loading, pokedex }, fetchMorePokedex }) => {
  return loading ? (
    <h1>Loading....</h1>
  ) : (
    <Fragment>
      {pokedex.map((pokemon) => (
        <PokedexItem pokemon={pokemon} key={pokemon.id} />
      ))}
      {pokedex.length <= 807 && (
        <button onClick={() => fetchMorePokedex(pokedex.length)}>
          Load More
        </button>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  pokemon: state.pokemon,
});

export default connect(mapStateToProps, { fetchPokedex, fetchMorePokedex })(
  Pokedex
);
