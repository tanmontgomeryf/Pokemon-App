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

const initialState = {
  loading: true,
  pokedex: null,
  pokemon: null,
  error: null,
};

const pokemonReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_POKEMON_REQUEST:
      return {
        ...state,
        loading: true,
        pokemon: null,
        error: null,
      };
    case FETCH_POKEMON_SUCCESS:
      return {
        ...state,
        loading: false,
        pokemon: payload,
      };
    case FETCH_POKEDEX_SUCCESS:
      return {
        ...state,
        loading: false,
        pokedex: payload,
      };
    case FETCH_MORE_POKEDEX_SUCCESS:
      return {
        ...state,
        loading: false,
        pokedex: [...state.pokedex, ...payload],
      };
    case REMOVE_EXTRA_POKEMON:
      return {
        ...state,
        loading: false,
        pokedex: state.pokedex.filter((pokemon) => pokemon.id <= 807),
      };
    case FETCH_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case FETCH_GENERATION:
      return {
        ...state,
        loading: true,
        pokedex: null,
        error: null,
      };
    case FETCH_GENERATION_SUCCESS:
      return {
        ...state,
        loading: false,
        pokedex: payload,
      };
    case FETCH_GENERATION_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export default pokemonReducer;
