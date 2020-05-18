import React, { Fragment } from 'react';
import { cleanDescription } from '../helpers';

const PokemonDescription = ({ description }) => {
  return (
    <Fragment>
      {description.length > 0 &&
        cleanDescription(description, 'alpha-sapphire', 'omega-ruby').map(
          (description) => (
            <div key={description.version}>
              <h4>{description.version}</h4>
              <p>{description.description}</p>
            </div>
          )
        )}
    </Fragment>
  );
};

export default PokemonDescription;
