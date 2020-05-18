import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div>
      Landing Page
      <div>
        <Link to='/pokedex'>pokedex</Link>
      </div>
    </div>
  );
};

export default Landing;
