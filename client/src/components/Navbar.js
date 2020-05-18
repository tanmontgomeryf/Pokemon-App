import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <Fragment>
      <Link to='/'>
        <h4>Pokedex App</h4>
      </Link>
      <div>
        <Link to='/pokedex'>
          <h4>Pokedex</h4>
        </Link>
      </div>
    </Fragment>
  );
};

export default Navbar;
