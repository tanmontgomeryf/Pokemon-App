import React, { useState } from 'react';

const PokemonMainAbilities = ({ ability, description, is_hidden }) => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  let hidden;
  if (is_hidden) hidden = '(hidden ability)';
  return (
    <>
      <p className={`PokemonMainAbilities-title`} onClick={handleToggle}>
        {ability} <span>{hidden}</span>
      </p>
      <div className={`PokemonMainAbilities-body ${toggle ? null : 'close'}`}>
        <button className='btn-ability' onClick={handleToggle}>
          x
        </button>
        <p>{description}</p>
      </div>
    </>
  );
};

export default PokemonMainAbilities;
