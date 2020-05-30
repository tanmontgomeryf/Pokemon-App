import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { inLandingPage } from '../../redux';
import './LandingStyles.css';
import landing from '../../img/Landing3.png';

const Landing = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(inLandingPage());
  }, [dispatch]);
  return (
    <div className='Landing'>
      <Link to='/pokedex'>
        <div className='Landing-button'></div>
      </Link>
    </div>
  );
};

export default Landing;
