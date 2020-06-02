import {
  FETCHING_USERS,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR,
  FETCHING_USER,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR,
  EDIT_NICKNAME_SUCCESS,
  DELETE_POKEMON_SUCCESS,
  DELETE_USER_SUCCESS,
} from './usersTypes';

const initialState = {
  isLoading: true,
  users: null,
  user: null,
  error: null,
};

const usersReducer = (state = initialState, actions) => {
  const { type, payload } = actions;
  switch (type) {
    case FETCHING_USERS:
      return {
        ...state,
        isLoading: true,
        users: null,
        error: null,
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: payload,
      };
    case FETCH_USERS_ERROR:
    case FETCH_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case FETCHING_USER:
      return {
        ...state,
        isLoading: true,
        user: null,
        error: null,
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: payload,
      };
    case DELETE_POKEMON_SUCCESS:
    case EDIT_NICKNAME_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          pokemonTeam: payload,
        },
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.filter((user) => user._id !== payload),
        user: null,
      };
    default:
      return state;
  }
};

export default usersReducer;
