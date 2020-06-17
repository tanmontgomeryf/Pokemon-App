import { combineReducers } from 'redux';
import pokemonReducer from './pokemon/pokemonReducer';
import isLandingReducer from './isLanding/isLandingReducer';
import authReducer from './auth/authReducer';
import usersReducer from './users/usersReducer';
import alertReducer from './alert/alertReducer';

const rootReducer = combineReducers({
  pokemon: pokemonReducer,
  isLanding: isLandingReducer,
  auth: authReducer,
  users: usersReducer,
  alert: alertReducer,
});

export default rootReducer;
