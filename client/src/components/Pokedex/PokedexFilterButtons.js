import React from 'react';

const PokedexFilterButtons = ({ handleClick, isOpen, handleToggle }) => {
  return (
    <div className={`Pokedex-filterButtons ${isOpen ? 'open' : null}`}>
      <button onClick={handleToggle}>
        <i className='fas fa-chevron-up'></i>
      </button>
      <button onClick={handleClick} name='allGen'>
        All Generation
      </button>
      <button onClick={handleClick} name='gen1'>
        Generation 1
      </button>
      <button onClick={handleClick} name='gen2'>
        Generation 2
      </button>
      <button onClick={handleClick} name='gen3'>
        Generation 3
      </button>
      <button onClick={handleClick} name='gen4'>
        Generation 4
      </button>
      <button onClick={handleClick} name='gen5'>
        Generation 5
      </button>
      <button onClick={handleClick} name='gen6'>
        Generation 6
      </button>
      <button onClick={handleClick} name='gen7'>
        Generation 7
      </button>
    </div>
  );
};

export default PokedexFilterButtons;
