import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  fetchPokedex,
  fetchMorePokedex,
  notLandingPage,
  fetchGenerationData,
} from '../../redux';
import PokedexItem from './PokedexItem';
import InfiniteScroll from 'react-infinite-scroller';
import ScrollUp from 'react-scroll-up';
import Loader from '../Layouts/Loader';
import './PokedexStyles.css';
import PokedexFilter from './PokedexFilter';
import Alert from '../Layouts/Alert';

const Pokedex = ({
  pokemon: { loading, pokedex },
  fetchMorePokedex,
  notLandingPage,
  fetchGenerationData,
}) => {
  useEffect(() => {
    notLandingPage();
  }, [notLandingPage]);

  const [fullDex, setFullDex] = useState(true);

  return loading || pokedex === null ? (
    <Loader />
  ) : (
    <div className='Pokedex'>
      <PokedexFilter
        fetchGenerationData={fetchGenerationData}
        setFullDex={setFullDex}
      />
      <div className='Pokedex-alert'>
        <Alert />
      </div>
      <InfiniteScroll
        pageStart={0}
        loadMore={() =>
          pokedex.length <= 800 && fetchMorePokedex(pokedex.length)
        }
        hasMore={pokedex.length <= 800 && fullDex ? true : false}
        loader={<Loader key={0} infiniteScroll />}
        className='Pokedex-Grid'
      >
        {pokedex.map((pokemon) => (
          <PokedexItem pokemon={pokemon} key={pokemon.id} />
        ))}
      </InfiniteScroll>
      <ScrollUp
        className='Pokedex-scrollUp'
        showUnder={160}
        style={{
          height: '50px',
          width: '50px',
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: '#bd3736',
          borderRadius: '50%',
          bottom: 20,
          right: 20,
        }}
      >
        <i className='fas fa-chevron-up PokedexScrollUpIcon'></i>
      </ScrollUp>
    </div>
  );
};

const mapStateToProps = (state) => ({
  pokemon: state.pokemon,
});

export default connect(mapStateToProps, {
  fetchPokedex,
  fetchMorePokedex,
  notLandingPage,
  fetchGenerationData,
})(Pokedex);
