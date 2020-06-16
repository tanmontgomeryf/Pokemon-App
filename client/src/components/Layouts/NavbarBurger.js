import React, { useState } from 'react';
import NavbarBurgerIcon from './NavbarBurgerIcon';
import NavbarLinks from './NavbarLinks';

const NavbarBurger = () => {
  const [toggle, setToggle] = useState(false);
  const handleClick = () => {
    setToggle(!toggle);
  };
  return (
    <>
      <NavbarBurgerIcon isOpen={toggle} handleClick={handleClick} />
      <NavbarLinks isOpen={toggle} setToggle={setToggle} />
    </>
  );
};

export default NavbarBurger;
