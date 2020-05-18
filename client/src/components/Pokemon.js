import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchPokemon } from '../redux';
import PokemonEvoChain from './PokemonEvoChain';
import PokemonBaseStats from './PokemonBaseStats';
import PokemonMain from './PokemonMain';
import PokemonDescription from './PokemonDescription';

const Pokemon = ({
  pokemon: { loading, pokemon },
  history: { goBack },
  match: {
    params: { id },
  },
  fetchPokemon,
}) => {
  useEffect(() => {
    fetchPokemon(id);
  }, [fetchPokemon, id]);

  const handleClick = () => goBack();

  return loading || pokemon.loading ? (
    <h1>Loading...</h1>
  ) : (
    <Fragment>
      <button onClick={handleClick}>Go Back</button>
      <h1>National Pokedex</h1>
      <PokemonMain pokemon={pokemon} />
      <PokemonDescription description={pokemon.description} />
      <PokemonBaseStats totalPokeStats={pokemon.totalPokeStats} />
      <PokemonEvoChain evolutionChain={pokemon.evolutionChain} id={id} />
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  pokemon: state.pokemon,
});

export default connect(mapStateToProps, { fetchPokemon })(Pokemon);
