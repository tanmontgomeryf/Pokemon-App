import axios from 'axios';
import {
  FETCHING_USERS,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR,
  FETCHING_USER,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR,
} from './usersTypes';

const fetchingUsers = () => ({
  type: FETCHING_USERS,
});

const fecthingUser = () => ({
  type: FETCHING_USER,
});

const fetchUsersSuccess = (users) => ({
  type: FETCH_USERS_SUCCESS,
  payload: users,
});

const fetchUserSuccess = (user) => ({
  type: FETCH_USER_SUCCESS,
  payload: user,
});

const fetchUsersError = (error) => ({
  type: FETCH_USERS_ERROR,
  payload: error,
});

const fetchUserError = (error) => ({
  type: FETCH_USER_ERROR,
  payload: error,
});

export const fetchUsersData = () => async (dispatch) => {
  dispatch(fetchingUsers());
  try {
    const response = await axios.get('/user');
    dispatch(fetchUsersSuccess(response.data));
  } catch (error) {
    dispatch(fetchUsersError(error));
  }
};

export const fetchUserData = (userId) => async (dispatch) => {
  dispatch(fecthingUser());
  try {
    const response = await axios.get(`/user/${userId}`);
    dispatch(fetchUserSuccess(response.data));
  } catch (error) {
    dispatch(fetchUserError(error));
  }
};
