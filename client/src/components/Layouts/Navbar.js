import React from 'react';
import { Link } from 'react-router-dom';
import NavbarBurger from './NavbarBurger';
import Navform from '../Forms/Navform';
import './Navbar.css';
import logo from '../../img/AppLogo.png';

const Navbar = () => {
  return (
    <div className='Navbar'>
      <Link to='/' className='Navbar-logo'>
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
