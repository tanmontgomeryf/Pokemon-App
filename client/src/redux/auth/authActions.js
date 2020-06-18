import axios from 'axios';
import {
  FETCH_AUTH_SUCCESS,
  FETCHING_AUTH,
  AUTH_ERROR,
  LOGGING_IN,
  LOGGING_OUT,
  LOGOUT_SUCCESS,
  REGISTERING,
  ADD_POKEMON_ERROR,
  ADD_POKEMON_SUCCESS,
  DELETE_POKEMON_SUCCESS,
  DELETE_POKEMON_ERROR,
  EDIT_NICKNAME_SUCCESS,
  EDIT_NICKNAME_ERROR,
  DELETE_USER_SUCCESS,
  DELETE_USER_ERROR,
} from './authTypes';
import { setAlert } from '../index';

const fetchingAuth = () => ({
  type: FETCHING_AUTH,
});

const fetchUserSuccess = (userInfo) => ({
  type: FETCH_AUTH_SUCCESS,
  payload: userInfo,
});

const authError = (error) => ({
  type: AUTH_ERROR,
  payload: error,
});

const registering = () => ({
  type: REGISTERING,
});

const loggingin = () => ({
  type: LOGGING_IN,
});

const loggingout = () => ({
  type: LOGGING_OUT,
});

const addPokemonSuccess = (data) => ({
  type: ADD_POKEMON_SUCCESS,
  payload: data,
});

const addPokemonError = (error) => ({
  type: ADD_POKEMON_ERROR,
  payload: error,
});

const deletePokemonSuccess = (data) => ({
  type: DELETE_POKEMON_SUCCESS,
  payload: data,
});

const deletePokemonError = (error) => ({
  type: DELETE_POKEMON_ERROR,
  payload: error,
});

const editNickNameSuccess = (data) => ({
  type: EDIT_NICKNAME_SUCCESS,
  payload: data,
});

const editNickNameError = (error) => ({
  type: EDIT_NICKNAME_ERROR,
  payload: error,
});

const deleteUserSuccess = (userId) => ({
  type: DELETE_USER_SUCCESS,
  payload: userId,
});

const deleteUserError = (error) => ({
  type: DELETE_USER_ERROR,
  payload: error,
});

export const fetchUserInfo = () => async (dispatch) => {
  dispatch(fetchingAuth());
  try {
    const response = await axios.get('/api/auth');
    dispatch(fetchUserSuccess(response.data));
  } catch (error) {
    dispatch(authError(error.message));
  }
};

export const register = (formData) => async (dispatch) => {
  dispatch(registering());
  const data = JSON.stringify(formData);
  try {
    await axios.post('/api/user', data, {
      headers: { 'Content-Type': 'application/json' },
    });
    dispatch(fetchUserInfo());
  } catch (error) {
    dispatch(authError(error.message));
    dispatch(setAlert('Email has already been taken', 'danger'));
  }
};

export const login = (formData) => async (dispatch) => {
  dispatch(loggingin());
  const data = JSON.stringify(formData);
  try {
    await axios.post('/api/auth', data, {
      headers: { 'Content-Type': 'application/json' },
    });
    dispatch(fetchUserInfo());
  } catch (error) {
    dispatch(authError(error.message));
    dispatch(setAlert('Invalid username/password', 'danger'));
  }
};

export const logout = () => async (dispatch) => {
  dispatch(loggingout());
  try {
    await axios.get('api/user/logout');
    dispatch({
      type: LOGOUT_SUCCESS,
    });
    dispatch(setAlert('Succesfully Logged out', 'success'));
  } catch (error) {
    dispatch(authError(error.message));
  }
};

export const addPokemonToTeam = (userId, pokemonId, pokemonDetails) => async (
  dispatch
) => {
  try {
    const data = {
      pokemonDetails,
      id: pokemonId,
    };
    const response = await axios.post(`/api/user/${userId}`, data, {
      headers: { 'Content-Type': 'application/json' },
    });
    dispatch(addPokemonSuccess(response.data));
    dispatch(setAlert('Succesfully Added', 'success'));
  } catch (error) {
    dispatch(addPokemonError(error));
  }
};

export const deletePokemon = (userId, pokemonId) => async (dispatch) => {
  try {
    const response = await axios.delete(
      `/api/user/${userId}/pokemon/${pokemonId}`
    );
    dispatch(deletePokemonSuccess(response.data));
    dispatch(setAlert('Succesfully deleted', 'success'));
  } catch (error) {
    dispatch(deletePokemonError(error));
  }
};

export const editNickName = (userId, pokemonId, nickname) => async (
  dispatch
) => {
  const data = {
    nickname: nickname,
  };
  try {
    const response = await axios.put(
      `/api/user/${userId}/pokemon/${pokemonId}`,
      data,
      { headers: { 'Content-Type': 'application/json' } }
    );
    dispatch(editNickNameSuccess(response.data));
  } catch (error) {
    dispatch(editNickNameError(error));
  }
};

export const deleteUser = (userId) => async (dispatch) => {
  if (window.confirm('Are you sure? this can NOT be undone!')) {
    try {
      await axios.delete(`/api/user/${userId}`);
      dispatch(deleteUserSuccess(userId));
    } catch (error) {
      dispatch(deleteUserError(error));
    }
  }
};
