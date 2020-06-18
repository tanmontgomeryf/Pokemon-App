import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUserData, notLandingPage, deleteUser } from '../../redux';
import Loader from '../Layouts/Loader';
import TrainerPokemon from './TrainerPokemon';
import './TrainerStyles.css';
import TrainerMain from './TrainerMain';
import Alert from '../Layouts/Alert';
import NotFound from '../Layouts/NotFound';

const Trainer = ({
  users,
  auth,
  history,
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
  const handleClick = () => history.goBack();
  const handleUserDelete = () => {
    deleteUser(auth.user._id);
    history.push('/pokedex');
  };
  return users.isLoading || users.user === null ? (
    !users.isLoading && users.user === null && users.error !== null ? (
      <NotFound history={history} />
    ) : (
      <Loader />
    )
  ) : (
    <div className='Trainer'>
      <div className='Trainer-alert'>
        <Alert />
      </div>

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
          {users.user.pokemonTeam.length === 0 ? (
            users.user !== null &&
            auth.user !== null &&
            users.user._id === auth.user._id ? (
              <p>
                You don't have a pokemon, please go to{' '}
                <Link to='/pokedex'>pokedex</Link> and add one to your team
              </p>
            ) : (
              <p>This username doesn't have a pokemon yet</p>
            )
          ) : null}
          <div className='Trainer-pokemonGroup'>
            {users.user.pokemonTeam.map((pokemon) =>
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
                <Link key={pokemon._id} to={`/${pokemon.pokemonDetails.id}`}>
                  <TrainerPokemon
                    pokemon={pokemon}
                    paramsUserId={userId}
                    currentUser={auth.user}
                    isAuthenticated={auth.isAuthenticated}
                  />
                </Link>
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
