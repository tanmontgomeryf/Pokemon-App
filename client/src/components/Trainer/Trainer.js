import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUserData, notLandingPage, deleteUser } from '../../redux';
import Loader from '../Layouts/Loader';
import TrainerPokemon from './TrainerPokemon';
import './TrainerStyles.css';
import TrainerMain from './TrainerMain';

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
      <button onClick={handleClick} className='buttons type-primary'>
        Go Back
      </button>
      {users.error === null && users.user !== null && (
        <div className='Trainer-card'>
          <TrainerMain
            users={users}
            auth={auth}
            handleUserDelete={handleUserDelete}
          />
          <div className='Trainer-pokemonGroup'>
            {users.user.pokemonTeam.length === 0 ? (
              users.user !== null &&
              auth.user !== null &&
              users.user._id === auth.user._id ? (
                <p>
                  You don't have a pokemon, please go to your pokedex and add
                  one to your team
                </p>
              ) : (
                <p>This username doesn't have a pokemon yet</p>
              )
            ) : (
              users.user.pokemonTeam.map((pokemon) =>
                users.user !== null &&
                auth.user !== null &&
                users.user._id === auth.user._id ? (
                  <TrainerPokemon
                    key={pokemon._id}
                    pokemon={pokemon}
                    paramsUserId={userId}
                    currentUser={auth.user}
                    isAuthenticated={auth.isAuthenticated}
                  />
                ) : (
                  <Link to={`/${pokemon.pokemonDetails.id}`}>
                    <TrainerPokemon
                      key={pokemon._id}
                      pokemon={pokemon}
                      paramsUserId={userId}
                      currentUser={auth.user}
                      isAuthenticated={auth.isAuthenticated}
                    />
                  </Link>
                )
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
