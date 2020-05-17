import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchPokemon } from '../redux';

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
      <h1>Pokedex Data</h1>
      <h4>{pokemon.name}</h4>
      <p>National No.: #{pokemon.padID}</p>
      <img
        src={`https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`}
        alt={pokemon.name}
      />
      {pokemon.pokeTypes.map((type) => (
        <p key={type.type}>{type.type}</p>
      ))}
      {pokemon.description.length > 0 &&
        pokemon.description.map((description) => (
          <div>
            <h4>{description.version}</h4>
            <p>{description.description}</p>
          </div>
        ))}
      <p>weight: {pokemon.weight}</p>
      <p>height: {pokemon.height}</p>
      {pokemon.abilities.map((ability) => (
        <div>
          <h4>{ability.ability}</h4>
          <p>{ability.description}</p>
        </div>
      ))}
      <div>
        <h4>Base Stats</h4>
        {pokemon.totalPokeStats.map((stat) => (
          <p>
            <strong>{stat.name}:</strong> {stat.baseStat}
          </p>
        ))}
      </div>
      <div>
        <h4>Evolution</h4>
        {pokemon.evolutionChain.map((evo) => (
          <div>
            <img
              src={`https://img.pokemondb.net/sprites/home/normal/${evo.name}.png`}
              alt={evo.name}
            />
            <p>
              {evo.name} #{evo.id ? evo.id : pokemon.id}
            </p>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  pokemon: state.pokemon,
});

export default connect(mapStateToProps, { fetchPokemon })(Pokemon);
