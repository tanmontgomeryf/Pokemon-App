import React, { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import Pokedex from './components/Pokedex/Pokedex';
import Pokemon from './components/Pokemon/Pokemon';
import Navbar from './components/Layouts/Navbar';
import Landing from './components/Layouts/Landing';
import Login from './components/Forms/Login';
import Register from './components/Forms/Register';
import Trainers from './components/Trainers/Trainers';
import Trainer from './components/Trainer/Trainer';
import { fetchPokedex, fetchUserInfo } from './redux';
import './styles/App.css';
import NotFound from './components/Layouts/NotFound';

const App = () => {
  const isLanding = useSelector((state) => state.isLanding);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPokedex());
    dispatch(fetchUserInfo());
  }, [dispatch]);

  return (
    <Fragment>
      {!isLanding.isLanding && <Navbar />}
      <Switch>
        <Route exact path='/' render={() => <Landing />} />
        <Route exact path='/login' render={() => <Login />} />
        <Route exact path='/register' render={() => <Register />} />
        <Route exact path='/trainers' render={() => <Trainers />} />
        <Route
          exact
          path='/trainer/:userId'
          render={(props) => <Trainer {...props} />}
        />
        <Route
          exact
          path='/pokedex'
          render={(props) => <Pokedex {...props} />}
        />
        <Route
          exact
          path='/:idOrName'
          render={(props) => <Pokemon {...props} />}
        />
        <Route render={(props) => <NotFound {...props} />} />
      </Switch>
    </Fragment>
  );
};

export default App;
