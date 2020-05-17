import {
  FETCH_FAILURE,
  FETCH_REQUEST,
  FETCH_POKEMON_SUCCESS,
  FETCH_POKEDEX_SUCCESS,
  FETCH_MORE_POKEDEX_SUCCESS,
  FETCH_POKEMON_REQUEST,
  REMOVE_EXTRA_POKEMON,
} from './pokemonTypes';

const initialState = {
  loading: true,
  pokedex: [],
  pokemon: {
    loading: true,
  },
  error: '',
};

const pokemonReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_POKEMON_REQUEST:
      return {
        ...state,
        loading: true,
        pokemon: { ...state.pokemon, loading: true },
      };
    case FETCH_POKEMON_SUCCESS:
      return {
        ...state,
        loading: false,
        pokemon: { ...state.pokemon, loading: false, ...payload },
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
    default:
      return state;
  }
};

export default pokemonReducer;
