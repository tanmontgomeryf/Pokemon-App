import React, { useState } from 'react';
import PokedexFilterButtons from './PokedexFilterButtons';

const PokedexFilter = ({ fetchGenerationData, setFullDex }) => {
  const [toggle, setToggle] = useState(false);

  const handleClick = (e) => {
    fetchGenerationData(e.target.name);
    setToggle(!toggle);
    if (e.target.name === 'allGen') {
      setFullDex(true);
    } else {
      setFullDex(false);
    }
  };

  const handleToggle = () => {
    setToggle(!toggle);
  };
  return (
    <div className='Pokedex-filters'>
      <button className='Pokedex-filterButton' onClick={handleToggle}>
        Filter by generation
      </button>
      <PokedexFilterButtons
        handleClick={handleClick}
        isOpen={toggle}
        handleToggle={handleToggle}
      />
    </div>
  );
};

export default PokedexFilter;
