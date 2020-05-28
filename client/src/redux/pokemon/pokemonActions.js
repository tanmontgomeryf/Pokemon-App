import axios from 'axios';
import {
  FETCH_FAILURE,
  FETCH_REQUEST,
  FETCH_POKEMON_SUCCESS,
  FETCH_POKEDEX_SUCCESS,
  FETCH_MORE_POKEDEX_SUCCESS,
  FETCH_POKEMON_REQUEST,
  REMOVE_EXTRA_POKEMON,
  FETCH_GENERATION,
  FETCH_GENERATION_SUCCESS,
  FETCH_GENERATION_ERROR,
} from './pokemonTypes';
import { checkGen } from '../../helpers';

const fetchRequest = () => ({
  type: FETCH_REQUEST,
});

const fetchPokemonRequest = () => ({
  type: FETCH_POKEMON_REQUEST,
});

const fetchPokedexSuccess = (pokedex) => ({
  type: FETCH_POKEDEX_SUCCESS,
  payload: pokedex,
});

const fetchMorePokedexSuccess = (pokedex) => ({
  type: FETCH_MORE_POKEDEX_SUCCESS,
  payload: pokedex,
});

const removeExtraPokemon = (pokedex) => ({
  type: REMOVE_EXTRA_POKEMON,
});

const fetchPokemonSuccess = (pokemon) => ({
  type: FETCH_POKEMON_SUCCESS,
  payload: pokemon,
});

const fetchFailure = (error) => ({
  type: FETCH_FAILURE,
  payload: error,
});

const fetchingGenerationData = () => ({
  type: FETCH_GENERATION,
});

const fetchGenerationSuccess = (data) => ({
  type: FETCH_GENERATION_SUCCESS,
  payload: data,
});

const fetchGenerationError = (error) => ({
  type: FETCH_GENERATION_ERROR,
  payload: error,
});

export const fetchPokedex = () => async (dispatch) => {
  dispatch(fetchRequest());
  try {
    const response = await axios.get('/pokemon/pokedex');
    dispatch(fetchPokedexSuccess(response.data));
  } catch (error) {
    console.log(error);
    dispatch(fetchFailure(error.message));
  }
};

export const fetchMorePokedex = (num) => async (dispatch) => {
  try {
    const response = await axios.get(`/pokemon/pokedex/${num}`);
    dispatch(fetchMorePokedexSuccess(response.data));
    dispatch(removeExtraPokemon());
  } catch (error) {
    console.log(error);
    dispatch(fetchFailure(error.message));
  }
};

export const fetchPokemon = (idOrName) => async (dispatch) => {
  dispatch(fetchPokemonRequest());
  try {
    const response = await axios.get(`/pokemon/${idOrName}`);
    dispatch(fetchPokemonSuccess(response.data));
  } catch (error) {
    console.log(error);
    dispatch(fetchFailure(error.message));
  }
};

export const fetchGenerationData = (str) => async (dispatch) => {
  dispatch(fetchingGenerationData());
  const gen = checkGen(str);
  try {
    const response = await axios.get(
      `/pokemon/pokedex/${gen.num}/${gen.limit}`
    );
    dispatch(fetchGenerationSuccess(response.data));
  } catch (error) {
    dispatch(fetchGenerationError(error));
  }
};
