import {
  FETCHING_AUTH,
  FETCH_AUTH_SUCCESS,
  AUTH_ERROR,
  LOGGING_IN,
  LOGGING_OUT,
  LOGOUT_SUCCESS,
  REGISTERING,
  ADD_POKEMON_SUCCESS,
  ADD_POKEMON_ERROR,
  DELETE_POKEMON_SUCCESS,
  DELETE_POKEMON_ERROR,
  EDIT_NICKNAME_SUCCESS,
  EDIT_NICKNAME_ERROR,
} from './authTypes';

const initialState = {
  loading: true,
  user: null,
  isAuthenticated: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCHING_AUTH:
    case LOGGING_IN:
    case REGISTERING:
      return {
        ...state,
        loading: true,
        isAuthenticated: false,
        user: null,
        error: null,
      };
    case FETCH_AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: payload,
      };
    case AUTH_ERROR:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: payload,
      };
    case LOGGING_OUT:
      return {
        ...state,
        loading: true,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        user: null,
        isAuthenticated: false,
      };
    case ADD_POKEMON_SUCCESS:
    case DELETE_POKEMON_SUCCESS:
    case EDIT_NICKNAME_SUCCESS:
      return {
        ...state,
        error: null,
        user: {
          ...state.user,
          pokemonTeam: payload,
        },
      };
    case ADD_POKEMON_ERROR:
    case DELETE_POKEMON_ERROR:
    case EDIT_NICKNAME_ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};

export default authReducer;
