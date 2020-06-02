import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUserData, notLandingPage, deleteUser } from '../../redux';
import { addDefaultTeam } from '../../helpers';
import Loader from '../Layouts/Loader';
import TrainerPokemon from './TrainerPokemon';
import TrainerDefaultPokemon from './TrainerDefaultPokemon';
import './TrainerStyles.css';

const Trainer = ({
  users,
  auth,
  history: { goBack, push },
  match: {
    params: { userId },
  },
  fetchUserData,
  notLandingPage,
  deleteUser,
}) => {
  useEffect(() => {
    notLandingPage();
    fetchUserData(userId);
  }, [userId, notLandingPage, fetchUserData]);
  const handleClick = () => goBack();
  const handleUserDelete = () => {
    deleteUser(auth.user._id);
    push('/login');
  };
  return users.isLoading ? (
    <Loader />
  ) : (
    <div className='Trainer'>
      <div onClick={handleClick} className='Trainer-button type-primary'>
        Go Back
      </div>
      {users.error === null && users.user !== null && (
        <div className='Trainer-card'>
          <h4>{users.user.username}</h4>
          <h4>{users.user._id}</h4>
          {!users.isLoading &&
            users.user !== null &&
            auth.user !== null &&
            users.user._id === auth.user._id && (
              <button onClick={handleUserDelete}>Delete User</button>
            )}
          <div>
            {addDefaultTeam(users.user.pokemonTeam).map((pokemon, i) =>
              pokemon.defaultPokemon ? (
                <TrainerDefaultPokemon key={i} />
              ) : (
                <TrainerPokemon
                  key={pokemon._id}
                  pokemon={pokemon}
                  paramsUserId={userId}
                  currentUser={auth.user}
                  isAuthenticated={auth.isAuthenticated}
                />
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const mapToStateProps = (state) => ({
  users: state.users,
  auth: state.auth,
});

export default connect(mapToStateProps, {
  fetchUserData,
  notLandingPage,
  deleteUser,
})(Trainer);
