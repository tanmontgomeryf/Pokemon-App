import React from 'react';
import { Link } from 'react-router-dom';
import NavbarBurger from './NavbarBurger';
import Navform from '../Forms/Navform';
import './NavbarStyles.css';
import logo from '../../img/AppLogo.png';

const Navbar = () => {
  return (
    <div className='Navbar'>
      <Link to='/pokedex' className='Navbar-logo'>
        <img src={logo} alt='logo' />
      </Link>
      <div className='Navbar-icons'>
        <Navform />
        <NavbarBurger />
      </div>
    </div>
  );
};

export default Navbar;
