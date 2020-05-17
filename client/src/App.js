import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import Pokedex from './components/Pokedex';
import Pokemon from './components/Pokemon';
import { fetchPokedex } from './redux';

import './App.css';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPokedex());
  }, [dispatch]);
  return (
    <Switch>
      <Route exact path='/pokedex' render={() => <Pokedex />} />
      <Route exact path='/:id' render={(props) => <Pokemon {...props} />} />
    </Switch>
  );
};

export default App;
