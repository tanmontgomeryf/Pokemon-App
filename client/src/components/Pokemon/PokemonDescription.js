import React, { Fragment, useState } from 'react';
import { cleanDescription } from '../../helpers';
import PokemonDescriptionItemA from './PokemonDescriptionItemA';
import PokemonDescriptionItemB from './PokemonDescriptionB';

const PokemonDescription = ({ description }) => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const finalDescription = cleanDescription(
    description,
    'alpha-sapphire',
    'omega-ruby'
  );
  return (
    <div className='PokemonDescription'>
      <h4>Description:</h4>
      <div className='PokemonDescription-group'>
        {description.length > 0 && (
          <Fragment key={description.version}>
            <PokemonDescriptionItemA
              description={finalDescription[0]}
              handleToggle={handleToggle}
              toggle={toggle}
            />
            <PokemonDescriptionItemB
              description={finalDescription[1]}
              handleToggle={handleToggle}
              toggle={toggle}
            />
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default PokemonDescription;
