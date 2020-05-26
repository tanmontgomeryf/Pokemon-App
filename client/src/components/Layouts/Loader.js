import React from 'react';

const Loader = (props) => {
  const { infiniteScroll } = props;
  return (
    <div>
      {infiniteScroll ? (
        <div className='Pokedex-loader'>
          <div className='Pokedex-loading'></div>
          <div className='Pokedex-loading'></div>
          <div className='Pokedex-loading'></div>
        </div>
      ) : (
        <div className='center-on-page'>
          <div className='pokeball'>
            <div className='pokeball__button'></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Loader;
