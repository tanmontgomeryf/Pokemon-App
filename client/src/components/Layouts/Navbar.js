import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../redux';
import Navform from '../Forms/Navform';
import './NavbarStyles.css';

const Navbar = ({ isAuthenticated, logout, auth }) => {
  return (
    <div className='Navbar'>
      <div className='Navbar-logo'>
        <Link to='/'>Pokedex App</Link>
      </div>
      <div className='Navbar-linksdiv'>
        <Navform />
        <NavLink
          to='/pokedex'
          className='buttons type-danger'
          activeStyle={{ opacity: '0.5' }}
          isActive={(match) => {
            return match;
          }}
        >
          Pokedex
        </NavLink>
        <NavLink
          to='/trainers'
          className='buttons type-danger'
          activeStyle={{ opacity: '0.5' }}
          isActive={(match) => {
            return match;
          }}
        >
          Trainers
        </NavLink>
        {isAuthenticated ? (
          <>
            <NavLink
              to={`/trainer/${auth.user._id}`}
              className='buttons type-danger Navbar-myTeam'
              activeStyle={{ opacity: '0.5' }}
              isActive={(match) => {
                return match;
              }}
            >
              My Team{' '}
              <span className='Navbar-myTeamSpan'>
                {auth.user.pokemonTeam.length}
              </span>
            </NavLink>
            <div className='buttons type-danger' onClick={() => logout()}>
              Logout
            </div>
          </>
        ) : (
          <>
            <NavLink
              to='/login'
              className='buttons type-primary'
              activeStyle={{ opacity: '0.5' }}
              isActive={(match) => {
                return match;
              }}
            >
              Login
            </NavLink>
            <NavLink
              to='/register'
              className='buttons type-success'
              activeStyle={{ opacity: '0.5' }}
              isActive={(match) => {
                return match;
              }}
            >
              Register
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

const MapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
});

export default connect(MapStateToProps, { logout })(Navbar);
