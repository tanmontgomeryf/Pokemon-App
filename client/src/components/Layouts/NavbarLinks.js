import React from 'react';
import { connect } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { logout } from '../../redux';

const NavbarLinks = ({ isAuthenticated, logout, auth, isOpen, setToggle }) => {
  const history = useHistory();
  const handleClick = () => {
    setToggle(false);
  };
  return (
    <ul className={`Navbar-links ${isOpen ? null : 'close'}`}>
      <li onClick={handleClick}>
        <NavLink
          to='/pokedex'
          activeStyle={{ opacity: '0.5' }}
          isActive={(match) => {
            return match;
          }}
        >
          Pokedex
        </NavLink>
      </li>
      <li onClick={handleClick}>
        <NavLink
          to='/trainers'
          activeStyle={{ opacity: '0.5' }}
          isActive={(match) => {
            return match;
          }}
        >
          Trainers
        </NavLink>
      </li>

      {isAuthenticated ? (
        <>
          <li onClick={handleClick}>
            <NavLink
              to={`/trainer/${auth.user._id}`}
              activeStyle={{ opacity: '0.5' }}
              isActive={(match) => {
                return match;
              }}
            >
              My Team
            </NavLink>
          </li>
          <li>
            <div
              onClick={() => {
                logout();
                setToggle(!isOpen);
                history.push('/pokedex');
              }}
            >
              Logout
            </div>
          </li>
        </>
      ) : (
        <>
          <li onClick={handleClick}>
            <NavLink
              to='/login'
              activeStyle={{ opacity: '0.5' }}
              isActive={(match) => {
                return match;
              }}
            >
              Login
            </NavLink>
          </li>
          <li onClick={handleClick}>
            <NavLink
              to='/register'
              activeStyle={{ opacity: '0.5' }}
              isActive={(match) => {
                return match;
              }}
            >
              Register
            </NavLink>
          </li>
        </>
      )}
    </ul>
  );
};

const MapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
});

export default connect(MapStateToProps, { logout })(NavbarLinks);
