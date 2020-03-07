import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import queryString from 'query-string';

import { changeMoviePage } from '../../../store/actions/movies-actions';
import { movieListAll } from '../../../store/api/Movies.api';
import { sortListMovie } from '../../../store/localData';

import { MoviesList } from '../components';
import FilterList from '../../Filters/containers/FilterList';
import PageSwitcher from 'ui/Page-switcher/Page-switcher';
import ServiceBlock from '../../Service/ServiceBlock';

class MoviesAll extends Component {
  state = {
    intervalId: 0
  };

  componentDidUpdate (prevProps, previousState) {
    if (this.props.location.search !== prevProps.location.search) {
      // this.scrollToTop();
      this.sendRequest();
    } else if (previousState.sortSettings !== this.state.sortSettings) {
      this.sendRequest();
    }
  }

  componentDidMount () {
    // if (window.pageYOffset === 0) {
    //    clearInterval(this.state.intervalId);
    // }
    // this.scrollToTop();
    this.sendRequest();
  }

  get getUrlObjectState () {
    return {
      genre: queryString.parse(this.props.location.search).genre,
      country: queryString.parse(this.props.location.search).country,
      sort_by: queryString.parse(this.props.location.search).sort_by,
      year: queryString.parse(this.props.location.search).year,
      page: queryString.parse(this.props.location.search).page,
      adult: queryString.parse(this.props.location.search).adult
    };
  }

  sendRequest = () => {
    const page = +this.getUrlObjectState.page;

    const UrlStateObj = {
      page: +this.getUrlObjectState.page,
      country: this.getUrlObjectState.country,
      genres: this.getUrlObjectState.genre,
      sort_by: this.getUrlObjectState.sort_by,
      year: this.getUrlObjectState.year,
      adult: this.getUrlObjectState.adult
    };

    if (!page) {
      delete UrlStateObj.page;
    }

    if (page <= 2) {
      UrlStateObj.page += 1;
    } else if (page === 3) {
      UrlStateObj.page += 2;
    } else if (page >= 4) {
      UrlStateObj.page = UrlStateObj.page + UrlStateObj.page - 1;
    }

    this.props.loadList(UrlStateObj.page, UrlStateObj.genres, UrlStateObj.sort_by, UrlStateObj.year, UrlStateObj.country, UrlStateObj.adult);
  };

  prevPage = () => {
    const urlObj = this.getUrlObjectState;
    this.props.changeListStatus('AllMovies');

    if (this.getUrlObjectState.page > 2) {
      urlObj.page = +this.getUrlObjectState.page - 1;
    }

    if (this.getUrlObjectState.page <= 2) {
      delete urlObj.page;
    }

    this.props.history.push({
      search: queryString.stringify(urlObj)
    });
  };

  nextPage = () => {
    const urlObj = this.getUrlObjectState;
    this.props.changeListStatus('AllMovies');

    urlObj.page = 2;

    if (this.getUrlObjectState.page >= 2) {
      urlObj.page = +this.getUrlObjectState.page + 1;
    }

    this.props.history.push({
      search: queryString.stringify(urlObj)
    });
  };

  scrollStep = () => {
    if (window.pageYOffset === 0) {
      clearInterval(this.state.intervalId);
    }
    window.scroll(0, window.pageYOffset - 50);
  };

  scrollToTop = () => {
    const intervalId = setInterval(this.scrollStep.bind(this), 16.66);
    this.setState({ intervalId: intervalId });
  };

  render () {
    const width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    const { AllMovies } = this.props;
    return (
      <main className='main main--media-list'>
        <Helmet>
          <title>Фильмы</title>
        </Helmet>
        <ServiceBlock
          isLoading={AllMovies.isFetching}
          isError={AllMovies.status}
          fetch={this.sendRequest}
        >

          <div className='movies-content'>
            <FilterList
              location={this.props.location}
              history={this.props.history}
              genresData={this.props.genres.isFetching ? this.props.genres.data.obj : {}}
              genres={this.props.genres.isFetching ? this.props.genres.data.arr.movieGenres : []}
              sortByCountry
              safeFilter
              sortListType={sortListMovie}
              MobileFilter={width >= 963}
            />
            <MoviesList
              movieListTitle={`Всего фильмов (${AllMovies.data.total_results})`}
              movieList={AllMovies}
              typeList='movie'
            />

            <PageSwitcher
              page={AllMovies.data.page}
              totalPages={AllMovies.data.total_pages}
              handlePrevPage={this.prevPage}
              handleNextPage={this.nextPage}
            />

          </div>
        </ServiceBlock>
      </main>
    );
  }
}

function mapStateToProps (state) {
  return {
    AllMovies: state.Movies.AllMovies,
    genres: state.General.Genres
  };
}

const mapDispatchToProps = (dispatch) => ({
  loadList: (page, genre, sortType, date, country, adult) => dispatch(movieListAll(page, genre, sortType, date, country, adult)),
  changeListStatus: (type) => dispatch(changeMoviePage(type))
});

export default connect(mapStateToProps, mapDispatchToProps)(MoviesAll);
