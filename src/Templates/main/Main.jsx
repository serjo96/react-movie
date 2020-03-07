import React, { Component } from 'react';
import { connect } from 'react-redux';

import { onLoadMainPage } from '../../store/api/General.api';

import { MoviesList } from '../MoviesList/components';
import Spinner from '../../ui-components/spinner/Spinner';

class Main extends Component {
  componentDidMount () {
    this.props.loadUpcomingMovies();
  }

  render () {
    if (this.props.UpcomingList.isFetching && this.props.TopMovies.isFetching && this.props.AllMovies.isFetching && this.props.PlayMovies.isFetching) {
      return (
        <main className='main main--media-list iphonex'>
          <div className='movies-content movies-content--main-page'>
            <MoviesList movieListTitle='Сейчас в кино' movieList={this.props.PlayMovies} count={11} movieListMain ListLink='playing' typeList='movie' />
            <MoviesList movieListTitle='Скоро в кино' movieList={this.props.UpcomingList} count={11} movieListMain ListLink='upcoming' typeList='movie' />
            <MoviesList movieListTitle='Топ фильмы' movieList={this.props.TopMovies} count={11} movieListMain={false} ListLink='top' typeList='movie' />
            <MoviesList movieListTitle='Все фильмы' movieList={this.props.AllMovies} count={11} movieListMain ListLink='all' typeList='movie' />
          </div>
        </main>
      );
    }
    return (<Spinner />);
  }
}

const mapDispatchToProps = (dispatch) => ({
  loadUpcomingMovies: () => dispatch(onLoadMainPage())
});

function mapStateToProps (state) {
  return {
    UpcomingList: state.Movies.upcomingMovies,
    TopMovies: state.Movies.TopMovies,
    AllMovies: state.Movies.AllMovies,
    PlayMovies: state.Movies.PlayingMovies
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
