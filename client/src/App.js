import React, { useEffect, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import Pokedex from './components/Pokedex';
import Pokemon from './components/Pokemon';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import { fetchPokedex } from './redux';

import './App.css';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPokedex());
  }, [dispatch]);
  return (
    <Fragment>
      <Navbar />
      <Switch>
        <Route exact path='/' render={() => <Landing />} />
        <Route exact path='/pokedex' render={() => <Pokedex />} />
        <Route exact path='/:id' render={(props) => <Pokemon {...props} />} />
      </Switch>
    </Fragment>
  );
};

export default App;
