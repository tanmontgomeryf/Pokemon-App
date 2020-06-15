import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchPokemon, notLandingPage, addPokemonToTeam } from '../../redux';
import PokemonEvoChain from './PokemonEvoChain';
import PokemonBaseStats from './PokemonBaseStats';
import PokemonMain from './PokemonMain';
import PokemonDescription from './PokemonDescription';
import Loader from '../Layouts/Loader';
import { checkRequestPokemon } from '../../helpers';
import './PokemonStyles.css';

const Pokemon = ({
  pokemon: { loading, pokemon, error },
  auth,
  history: { goBack },
  match: {
    params: { idOrName },
  },
  fetchPokemon,
  notLandingPage,
  addPokemonToTeam,
}) => {
  useEffect(() => {
    notLandingPage();
    fetchPokemon(checkRequestPokemon(idOrName));
  }, [fetchPokemon, idOrName, notLandingPage]);

  const handleClick = () => goBack();

  const handleAddPokemon = () => {
    const pokemonDetails = {
      name: pokemon.name,
      id: pokemon.id,
      types: pokemon.types,
      stats: pokemon.stats,
    };
    addPokemonToTeam(auth.user._id, pokemon._id, pokemonDetails);
  };

  let result;

  if (auth.user !== null) {
    result =
      auth.user.pokemonTeam.length >= 6 ? (
        <div className='buttons type-danger disabled'>Team is full</div>
      ) : (
        <div onClick={handleAddPokemon} className='buttons type-primary'>
          Add to team
        </div>
      );
  }

  return loading || pokemon === null ? (
    <Loader />
  ) : (
    <div className='Pokemon'>
      <div className='Pokemon-buttons'>
        <div onClick={handleClick} className='buttons type-primary'>
          Go Back
        </div>
        {!auth.loading && auth.isAuthenticated && pokemon !== null && result}
      </div>
      {error === null && pokemon !== null && (
        <>
          <PokemonMain pokemon={pokemon} />
          <PokemonDescription description={pokemon.description} />
          <div className='Pokemon-section'>
            <PokemonBaseStats stats={pokemon.stats} />
            <PokemonEvoChain
              evolutionChain={pokemon.evolutionChain}
              id={pokemon.id}
              idOrName={idOrName}
            />
          </div>
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  pokemon: state.pokemon,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  fetchPokemon,
  notLandingPage,
  addPokemonToTeam,
})(Pokemon);
