import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUserData, notLandingPage } from '../../redux';
import { addDefaultTeam } from '../../helpers';
import Loader from '../Layouts/Loader';
import TrainerPokemon from './TrainerPokemon';

const Trainer = ({
  users,
  auth,
  history: { goBack },
  match: {
    params: { userId },
  },
  fetchUserData,
  notLandingPage,
}) => {
  useEffect(() => {
    notLandingPage();
    fetchUserData(userId);
  }, [userId, notLandingPage, fetchUserData]);
  const handleClick = () => goBack();

  return users.isLoading ? (
    <Loader />
  ) : (
    <div>
      <div onClick={handleClick} className='buttons type-primary'>
        Go Back
      </div>
      {users.error === null && users.user !== null && (
        <div>
          <h4>{users.user.username}</h4>
          <h4>{users.user._id}</h4>
          {!users.isLoading &&
            users.user !== null &&
            auth.user !== null &&
            users.user._id === auth.user._id && <button>x</button>}
          <div>
            {addDefaultTeam(users.user.pokemonTeam).map((pokemon) =>
              pokemon.defaultPokemon ? (
                <div>default pokemon</div>
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

export default connect(mapToStateProps, { fetchUserData, notLandingPage })(
  Trainer
);
