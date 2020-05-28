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
import ScrollToTop from 'react-scroll-up';
import Loader from '../Layouts/Loader';

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

  const handleClick = (e) => {
    fetchGenerationData(e.target.name);
    if (e.target.name === 'allGen') {
      setFullDex(true);
    } else {
      setFullDex(false);
    }
  };

  return loading || pokedex === null ? (
    <Loader />
  ) : (
    <div className='Pokedex'>
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
      <ScrollToTop showUnder={160}>
        <span>UP</span>
      </ScrollToTop>
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
