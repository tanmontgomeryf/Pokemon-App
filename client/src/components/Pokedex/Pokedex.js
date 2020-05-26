import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchPokedex, fetchMorePokedex, notLandingPage } from '../../redux';
import PokedexItem from './PokedexItem';
import InfiniteScroll from 'react-infinite-scroller';
import ScrollToTop from 'react-scroll-up';
import Loader from '../Layouts/Loader';

const Pokedex = ({
  pokemon: { loading, pokedex },
  fetchMorePokedex,
  notLandingPage,
}) => {
  useEffect(() => {
    notLandingPage();
  }, [notLandingPage]);

  return loading || pokedex === null ? (
    <Loader />
  ) : (
    <div className='Pokedex'>
      <InfiniteScroll
        pageStart={0}
        loadMore={() =>
          pokedex.length <= 800 && fetchMorePokedex(pokedex.length)
        }
        hasMore={pokedex.length <= 800 ? true : false}
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
})(Pokedex);
