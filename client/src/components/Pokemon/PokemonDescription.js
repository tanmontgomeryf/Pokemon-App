import React, { useState } from 'react';
import { cleanDescription } from '../../helpers';
import PokemonDescriptionItemA from './PokemonDescriptionItemA';

const PokemonDescription = ({ description }) => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const finalDescription = cleanDescription(description);
  return (
    <div className='PokemonDescription'>
      <h4>Description:</h4>
      <div className='PokemonDescription-group'>
        {description.length > 0 && (
          <PokemonDescriptionItemA
            key={description.version}
            description={finalDescription}
            handleToggle={handleToggle}
            toggle={toggle}
          />
        )}
      </div>
    </div>
  );
};

export default PokemonDescription;
