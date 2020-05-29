import React from 'react';

const NavbarBurgerIcon = ({ handleClick, isOpen }) => {
  return (
    <div className='Navbar-burger'>
      <div
        className={`Navbar-burgerIcon ${isOpen ? 'close' : null}`}
        onClick={handleClick}
      >
        <div></div>
        <div></div>
        <div></div>
      </div>
      <i
        className={`fa fa-close ${isOpen ? null : 'close'}`}
        onClick={handleClick}
      ></i>
    </div>
  );
};

export default NavbarBurgerIcon;
