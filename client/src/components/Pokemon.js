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

  const { description, evolutionChain, stats } = pokemon;

  return loading || pokemon.loading ? (
    <h1>Loading...</h1>
  ) : (
    <Fragment>
      <h1>National Pokedex</h1>
      <button onClick={handleClick}>Go Back</button>
      <PokemonMain pokemon={pokemon} />
      <PokemonDescription description={description} />
      <PokemonBaseStats stats={stats} />
      <PokemonEvoChain evolutionChain={evolutionChain} id={id} />
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  pokemon: state.pokemon,
});

export default connect(mapStateToProps, { fetchPokemon })(Pokemon);
