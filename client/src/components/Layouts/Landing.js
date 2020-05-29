import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { inLandingPage } from '../../redux';
import './LandingStyles.css';

const Landing = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(inLandingPage());
  }, [dispatch]);
  return (
    <div className='Landing'>
      <Link to='/pokedex'>
        <div className='Landing-button'></div>
        <div className='Landing-ball'></div>
      </Link>
    </div>
  );
};

export default Landing;
